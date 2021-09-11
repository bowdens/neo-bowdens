import Console from 'react-terminal';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useState } from "react";

import { objToInodes } from './utils/fs';
import { elementToText } from './utils/utils';
import Home from "./pages/Home";
import Projects, { Extradimensional, Libtalaris } from "./pages/Projects";
import Secret from './pages/Secret';
import About from './pages/About';

import "bootstrap/dist/css/bootstrap.min.css";
import 'react-terminal/dist/index.css';
import './App.css';

const fs = objToInodes({
  name: "/",
  path: "",
  content: Home,
  children: [{
    name: "projects",
    path: "projects",
    content: Projects,
    children: [{
      name: "libtalaris",
      path: "libtalaris",
      content: Libtalaris
    }, {
      name: "extradimensional",
      path: "extradimensional",
      content: Extradimensional
    }]
  }, {
    name: "about",
    path: "about",
    content: About,
  }, {
    name: ".secret",
    path: ".secret",
    content: Secret
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
      return children.sort().join(" ");
    },
    pwd: ({ argv: [prog, target] }) => {
      const inode = wd.stat(target || ".");
      if (!inode) {
        return `${prog}: ${target}: no such file or directory`;
      } else {
        return inode.pwd();
      }
    },
    cat: ({ argv: [prog, ...targets] }) => {
      let output = "";
      for (const target of targets) {
        const inode = wd.stat(target);
        if (!inode) {
          output += `${prog}: ${target}: no such file or directory\n`;
        } else {
          if (targets.length > 1) output += target + '\n';
          if (inode.content) output += elementToText(inode.content({})) + '\n';
        }
      }
      return output;
    },
    whoami: () => "Hi. I'm Tom. I'm not sure who you are though!",
    help: () => "Try using ls, pwd, and cd!",
    "?": () => "Try using ls, pwd, and cd!",
    sudo: () => "You are not in the sudoers file. This incident will be reported",
    ping: () => "pong",
    dir: () => "Try ls",
  }
  const Content = wd.content;
  return (
    <>
      <Container style={{ height: '100%', marginTop: "10vh", maxHeight: "70vh" }}>
        <Row style={{ height: '100%', maxWidth: "800px" }}>
          <Col md={6}>
            <Console
              style={{
                height: "70vh", minHeight: "200px",
                color: "limegreen", backgroundColor: "black",
              }}
              programs={programs}
              prompt={`${wd.name}\u00a0$\u00a0`}
            />
          </Col>
          <Col
            md={6}
            style={{
              overflowY: "auto",
              maxHeight: "100%",
              scrollbarWidth: "thin",
              scrollbarColor: "black transparent",
            }}
          >
            <Row>
              <div
                className="text-muted"
                style={{ cursor: "pointer" }}
                onClick={() => { setWd(wd.stat("/")) }}
              >
                {wd.pwd()}
              </div>
            </Row>
            <Row>
              <Content
                setWd={path => {
                  const newWd = wd.stat(path);
                  if (!!newWd) setWd(newWd);
                }}
              />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
