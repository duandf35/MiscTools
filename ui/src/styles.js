import spectre from 'spectre.css/dist/spectre.css'

export const background = (selected) => {
    if (selected) {
        return ''
    }

    return spectre['toast-primary'];
};

export const anchor = (selected) => {
    let anchor = { textDecoration: 'none', display: 'block', textAlign: 'center' };

    if (selected) {
        anchor['pointerEvents'] = 'none'
    }

    return anchor;
};
