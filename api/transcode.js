/* const express = require('express');
const { spawn } = require('child_process');

const app = express();

app.get('/transcode', (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('URL is required');
  }

  console.log(`Transcoding URL: ${url}`);

  const ffmpeg = spawn('ffmpeg', [
    '-i', url,
    '-c:v', 'libx264',
    '-preset', 'fast',
    '-c:a', 'aac',
    '-f', 'mp4',
    '-movflags', 'frag_keyframe+empty_moov',
    'pipe:1'
  ]);

  res.setHeader('Content-Type', 'video/mp4');

  ffmpeg.stdout.pipe(res);

  ffmpeg.stderr.on('data', (data) => {
    console.error(`FFmpeg stderr: ${data}`);
  });

  ffmpeg.on('error', (err) => {
    console.error('FFmpeg error: ', err);
    if (!res.headersSent) {
      res.status(500).send('Internal Server Error');
    }
  });

  ffmpeg.on('close', (code) => {
    if (code !== 0) {
      console.error(`FFmpeg process closed with code ${code}`);
      if (!res.headersSent) {
        res.status(500).send('Internal Server Error');
      }
    } else {
      console.log(`FFmpeg process closed successfully with code ${code}`);
    }
  });
});

// Defina a porta que o servidor vai usar
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
 */

const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const app = express();

ffmpeg.setFfmpegPath(ffmpegPath);

app.get('/transcode', (req, res) => {
  const inputUrl = req.query.url;
  
  if (!inputUrl) {
    return res.status(400).send('URL parameter is required');
  }

  res.contentType('mp4');
  
  const command = ffmpeg(inputUrl)
    .outputOptions([
      '-c:v libx264',
      '-preset fast',
      '-c:a aac',
      '-f mp4',
      '-movflags frag_keyframe+empty_moov'
    ])
    .on('error', (err) => {
      console.error('FFmpeg error: ', err);
      res.status(500).send('Error during transcoding');
    })
    .pipe(res, { end: true });

  command.run();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
