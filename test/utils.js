const { exec, execSync } = require('child_process')

const bashPath = execSync('which bash', { encoding: 'utf8' })

const execOpts = {
  encoding: 'utf8',
  shell: bashPath.trim()
}

module.exports = {
  exec: (command) => {
    return new Promise((resolve, reject) => {
      exec(command, execOpts, (err, stdout, stderr) => {
        if (err) {
          return reject(err)
        }

        resolve(stdout)
      })
    })
  }
}
