"use strict";

const major = Number(process.versions.node.split(".")[0]);

if (major !== 20) {
  console.error(
    [
      "This Gatsby project is pinned to Node.js 20.x.",
      `Current version: ${process.version}`,
      "Gatsby 5.13 can fail with opaque worker crashes on newer Node versions.",
      "Switch first, for example:",
      "  nvm install 20",
      "  nvm use 20",
    ].join("\n")
  );
  process.exit(1);
}
