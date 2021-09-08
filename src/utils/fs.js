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
            if (this.parent === null) return this;
            return this.parent.stat('');
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
            return this.name;
        }
        return this.parent.pwd() +  this.name + '/';
    }

    pwd() {
        if (this.parent === null) {
            return this.name;
        }
        return this._pwd().slice(0,-1);
    }
}

export const objToInodes = obj => {
    const i = new Inode(obj.name, obj.content, obj.path);
    if (obj.children) {
        obj.children.forEach(child => i.addChild(objToInodes(child)));
    }
    return i;
}

export default Inode;