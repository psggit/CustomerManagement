const fs = require("fs")
const path = require("path")

function setEnv() {
  // read package
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname + "./../package.json"), "utf-8"))
  const buildClient = pkg.scripts["build-client"].split("{BASE_URL}").join(process.env.BASE_URL)
  pkg.scripts["build-client"] = buildClient
  console.log("env", process.env.BASE_URL)
  fs.writeFileSync(path.join(__dirname + "./../package.json"), JSON.stringify(pkg, null, 2))
}

setEnv()
