const SESSION_KEY = 'jihoon_intania_user_session';

export function getSession() {
    const data = sessionStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
}

export function setSession(sessionData) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
}

export function clearSession() {
    sessionStorage.removeItem(SESSION_KEY);
}