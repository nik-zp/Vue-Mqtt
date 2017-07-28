export default new class {
    constructor() {
        this.listeners = new Map();
    }

    addListener(label, callback, vm) {
        if (typeof callback === 'function') {
            this.listeners.has(label) || this.listeners.set(label, []);
            this.listeners.get(label).push({callback: callback, vm: vm});

            return true;
        }

        return false;
    }

    removeListener(label, callback, vm) {
        let listeners = this.listeners.get(label),
            index;

        if (listeners && listeners.length) {
            index = listeners.reduce((i, listener, index) => {
                return (typeof listener.callback === 'function' && listener.callback === callback && listener.vm === vm) ?
                    i = index :
                    i;
            }, -1);

            if (index > -1) {
                listeners.splice(index, 1);
                this.listeners.set(label, listeners);
                return true;
            }
        }
        return false;
    }

    emit(label, ...args) {
        let ret = false;
        this.listeners.forEach((listeners, key) => {
            if (this.eq(label, key) && listeners && listeners.length) {
                listeners.forEach((listener) => {
                    listener.callback.call(listener.vm, ...args, label);
                });
                ret = true;
            }
        });
        return ret;
    }

    eq(str1, str2) {
        let arr1 = str1.split('/');
        let arr2 = str2.split('/');
        if (!str1.includes('#') && !str2.includes('#') && arr1.length !== arr2.length) {
            return false;
        }
        if (arr2.length < arr1.length) {
            arr2 = str1.split('/');
            arr1 = str2.split('/');
        }
        let ret = true;
        arr1.forEach((val, i) => {
            if (val === '+' || val === '#'
                || (arr2[i] && arr2[i] === '+')
                || (arr2[i] && arr2[i] === '#')
                || (arr2[i] && arr2[i] === val)) {
                return;
            }
            ret = false;
        })
        return ret;
    }

}
