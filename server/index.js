const express = require("express")
const path = require("path")
const app = express()
const fs = require("fs")
const helmet = require("helmet")
// const task = require("./task")

app.use(helmet({
  frameguard: "deny"
}))

app.get("*.js", (req, res, next) => {
  console.log("Processing js files....")
  console.log("Gzipping....")
  if (/app.*.js/.test(req.url) || /vendor.*.js/.test(req.url)) {
    req.url += ".gz"
    res.set("Content-Encoding", "gzip")
    res.set("Content-type", "text/javascript")
  }
  const vendorUrlRegex = /vendor.*.js/
  if (vendorUrlRegex.test(req.url)) {
    console.log("Setting cache for vendor....")
    res.setHeader("Cache-Control", "private, max-age=31536000")
  }
  next()
})

app.use("/admin", express.static(path.join(__dirname, "./../dist")))

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./../dist/index.html"))
})

// app.get("/*", (req, res) => {
//   //task.setEnv()
//   console.log("base", process.env)
//   const file = fs.readFileSync(path.resolve(__dirname, "./../dist/index.html"), "utf-8")
//   const newFile = file.split("{script}").join(`
//     <script>
//       window.BASE_URL = ${ process.env.BASE_URL}
//     </script>
//   `)
//   console.log("new file", newFile)
//   res.send(newFile)
// })

app.listen(8007, () => {
  // task.setEnv()
  console.log("Server is listening on the port 8007")
})