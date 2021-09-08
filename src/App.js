import './App.css';
import Console from 'react-terminal';
import 'react-terminal/dist/index.css';
import { objToInodes } from './utils/fs';
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import React, { useState } from "react";

const fs = objToInodes({
  name: "/",
  path: "/",
  content: Home,
  children: [{
    name: "Projects",
    path: "/projects",
    content: Projects
  }]
});

function App() {
  const [wd, setWd] = useState(fs);
  const programs = {
    cd: ({ argv: [prog, target] }) => {
      if (!target) {
        setWd(fs);
        return "";
      }
      const inode = wd.stat(target);
      if (!inode) {
        return `${prog}: ${target}: no such file or directory`;
      }
      setWd(inode);
      return "";
    },
    ls: ({ argv: [prog, ...args] }) => {
      const last = args.slice(-1)[0];
      const target = !!last && last[0] === '-' ? undefined : last;
      const all = args.reduce((a, v) => a | (v[0] === "-" && v.includes("a")), false);
      const someAll = all || args.reduce((a, v) => a | (v[0] === "-" && v.includes("A")), false);
      const inode = wd.stat(target || ".");
      if (!inode) {
        return `${prog}: ${target}: no such file or directory`;
      }
      let children = inode.children;
      if (!someAll) {
        children = children.filter(i => i.name[0] !== '.');
      }
      children = children.map(i => i.children.length > 0 ? i.name + '/' : i.name);
      if (all) {
        children = ['.', '..', ...children];
      }
      return children.join(" ");
    },
    pwd: ({ argv: [prog, target] }) => {
      const inode = wd.stat(target || ".");
      if (!inode) {
        return `${prog}: ${target}: no such file or directory`;
      } else {
        return inode.pwd();
      }
    }
  }
  const Content = wd.content;
  return (
    <>
      <h1>{wd.pwd()}</h1>
      <Content />
      <Console style={{ height: "200px", position: "fixed", bottom: "5%" }} programs={programs} prompt={`$\u00a0${wd.pwd()}\u00a0`} />
    </>
  );
}

export default App;
