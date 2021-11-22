import { createContext, useContext } from 'react';
import Button from 'react-bootstrap/Button';

class Inode {
    constructor(name, content, path) {
        this.name = name;
        this.content = content;
        this.path = path;
        this.children = [];
        this.parent = null;
    }

    addChild(inode) {
        if (this.children.find(i => i.name === inode.name) !== undefined) {
            return 1;
        } else {
            this.children.push(inode);
            inode.parent = this;
            return 0;
        }
    }

    stat(target) {
        if (target === '') return this;
        const [first, ...rest] = target.split('/');
        const restPath = rest.join('/');
        if (first === '') {
            // navigate to root
            if (this.parent === null) {
                if (restPath === '') {
                    return this;
                } else {
                    return this.stat(restPath);
                }
            }
            return this.parent.stat(target);
        }
        if (first === '.') {
            if (rest === []) return this;
            return this.stat(restPath);
        }
        if (first === '..') {
            if (this.parent === null) return this;
            return this.parent.stat(restPath);
        }
        const targetChild = this.children.find(i => i.name === first);
        if (!targetChild) return null;
        return targetChild.stat(restPath);
    }

    _pwd() {
        if (this.parent === null) {
            return [this.path];
        }
        return [...this.parent._pwd(), this.path];
    }

    pwd() {
        if (this.parent === null) {
            return this.name;
        }
        return this._pwd().join('/');
    }
}

export const objToInodes = obj => {
    const i = new Inode(obj.name, obj.content, obj.path);
    if (obj.children) {
        obj.children.forEach(child => i.addChild(objToInodes(child)));
    }
    return i;
};

export const inodeToRoutes = inode => {
    let routes = [];
    routes.push({ path: inode.pwd(), content: inode.content });
    if (inode.children) {
        for (const child of inode.children) {
            routes = [...routes, ...inodeToRoutes(child)];
        }
    }
    return routes;
}

export const fsContext = createContext({});

export const FsLink = ({ path, children }) => {
    const { setWd, wd } = useContext(fsContext);
    return (
        <Button variant="link" onClick={() => { setWd(wd.stat(path)) }}>{children}</Button>
    );
};

export default Inode;