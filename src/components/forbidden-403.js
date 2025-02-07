const React = require("react");

function Forbidden403() {
  return React.createElement("div", null, [
    React.createElement("h1", { key: "title" }, "403 - Forbidden"),
    React.createElement("p", { key: "message" }, "You do not have permission to access this page."),
    React.createElement("a", { href: "/", key: "link", style: { color: "#007BFF" } }, "Go Back to Home")
  ]);
}

module.exports.default = Forbidden403;
