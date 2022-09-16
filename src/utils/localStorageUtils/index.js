import { LOCAL_STORAGE_TOKEN } from 'config';
import { decodeToken, isTokenExpired } from 'react-jwt';

class LocalStorageUtils {
    getItem(key, defaultValue = '') {
        if (typeof localStorage === undefined) {
            return undefined;
        }
        let item = localStorage.getItem(key);
        if (item === undefined) {
            item = defaultValue;
        }
        return item;
    }
    setItem(key, value = '') {
        if (typeof localStorage !== undefined) {
            localStorage.setItem(key, value);
        }
    }
    removeItem(key) {
        if (typeof localStorage !== undefined) {
            localStorage.removeItem(key);
        }
    }
    getUser() {
        if (typeof localStorage !== undefined) {
            const token = this.getItem(LOCAL_STORAGE_TOKEN);
            if (!token) {
                return undefined;
            }
            if (isTokenExpired(token)) {
                this.deleteUser();
                return undefined;
            }
            if (token) {
                return decodeToken(token);
            }
            return token;
        }
        return undefined;
    }
    deleteUser() {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    }
    getToken() {
        return this.getItem(LOCAL_STORAGE_TOKEN);
    }
    clear() {
        localStorage.clear();
    }
}

export default new LocalStorageUtils();
