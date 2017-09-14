import spectre from 'spectre.css/dist/spectre.css'

export const btnBackground = (selected) => {
    if (selected) {
        return ''
    }

    return spectre['toast-primary'];
};

export const btnClicked = (selected) => {
    let anchor = { textDecoration: 'none', display: 'block', textAlign: 'center' };

    if (selected) {
        anchor['pointerEvents'] = 'none'
    }

    return anchor;
};
