import Console from '@bowdens/react-terminal';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useEffect, useRef, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import { fsContext, FsLink, inodeToRoutes, objToInodes } from './utils/fs';
import { elementToText } from './utils/utils';
import Home from "./pages/Home";
import Projects, { Extradimensional, Libtalaris, ReactTerimnal } from "./pages/Projects";
import Secret from './pages/Secret';
import About from './pages/About';
import Markov from './pages/Markov';

import "bootstrap/dist/css/bootstrap.min.css";
import '@bowdens/react-terminal/dist/index.css';
import './App.css';
import github from './assets/github.png';
import linkedin from './assets/linkedin.png';
import email from './assets/email.png';

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
    }, {
      name: "react-terminal",
      path: "react-terminal",
      content: ReactTerimnal
    }]
  }, {
    name: "about",
    path: "about",
    content: About,
  }, {
    name: "markov",
    path: "markov",
    content: Markov
  }, {
    name: ".secret",
    path: ".secret",
    content: Secret
  }]
});

function App() {
  const history = useHistory();
  const location = useLocation();
  const [wd, _setWd] = useState(fs);
  const setWd = newWd => {
    history.push(newWd.pwd());
    _setWd(newWd);
  };

  useEffect(() => {
    const node = fs.stat(location.pathname);
    _setWd(node);
    // we only want to do this when its first loaded to sync up the pathname with wd
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  };

  const commandRef = useRef();

  return (
    <fsContext.Provider value={{ wd, setWd, commandRef }}>
      <Container style={{ height: '100%', paddingTop: "10vh", maxHeight: "70vh" }}>
        <Row style={{ height: '100%' }}>
          <Col lg={4} sm={6} xs={12}>
            <Console
              style={{
                height: "70vh", minHeight: "200px",
                color: "limegreen", backgroundColor: "black",
              }}
              programs={programs}
              prompt={`${wd.name} $\u00a0`}
              motd={"Welcome to the terminal!\nYou can navigate using the unix commands like ls and cd."}
              tabComplete={[...Object.keys(programs), ...((wd && wd.children) || []).map(inode => inode.name)]}
              ref={commandRef}
            />
          </Col>
          <Col
            lg={4} sm={6} xs={12}
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
                onClick={() => {
                  if (commandRef.current?.pushCommand) {
                    commandRef.current?.pushCommand("cd /")
                  } else {
                    setWd(wd.stat("/"));
                  }
                }}
              >
                {wd.pwd()}
              </div>
            </Row>
            <Row>
              <Switch>
                {inodeToRoutes(fs).map(({ path, content: Content }) =>
                  <Route path={path} key={path} exact>
                    <Content />
                  </Route>
                )}
                <Route path="/">
                  Page not found! <FsLink path="/">Return Home</FsLink>
                </Route>
              </Switch>
            </Row>
          </Col>
          <Col className="d-none d-lg-flex flex-column" style={{padding: "0 5em"}} lg={4}>
            <Row className="mt-auto py-2" as="a" href="https://github.com/bowdens" target="_blank" rel="noopener noreferrer">
              <Col xs={4} className="d-flex justify-content-end">
                <img src={github} alt="Github Logo" height={24} />
              </Col>
              <Col xs={8}>@bowdens</Col>
            </Row>
            <hr />
            <Row className="py-2" as="a" href="https://linkedin.com/in/t-bowden" target="_blank" rel="noopener noreferrer">
              <Col xs={4} className="d-flex justify-content-end">
                <img src={linkedin} alt="Linkedin Logo" height={24} />
              </Col>
              <Col xs={8}>/in/t-bowden</Col>
            </Row>
            <hr />
            <Row className="mb-auto py-2" as="a" href="mailto://tom@bowdens.me">
              <Col xs={4} className="d-flex justify-content-end">
                <img src={email} alt="Email Icon" height={24} />
              </Col>
              <Col xs={8}>tom@bowdens.me</Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </fsContext.Provider>
  );
}

export default App;
