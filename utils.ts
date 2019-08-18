export const pad = (stringLength : number, padChar: string, num : number|string) : string => {
    let toPad = num + '';
    if (toPad.length < stringLength) {
        let padding = new Array(stringLength - toPad.length)
            .fill(padChar)
            .join('');

        toPad = padding + toPad;
    }

    return toPad
};

export const padTwo = (num) => pad(2, '0', num);
