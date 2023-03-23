export const currencyMask = (value: string) => {
    return value.replace(/\D/g, "")
        .replace(/(\d)(\d{2})$/, "$1,$2")
        .replace(/(?=(\d{3})+(\D))\B/g, ".")
}

export const currencyMaskToNumber = (value: string): number => {
    if (!value) return 1

    let currencyValue = "";

    const [number, cents] = value.split(",");

    const numberOnlyNumbers = number.split(".");
    numberOnlyNumbers.forEach((value) => (currencyValue += value));

    currencyValue += cents ? `.${cents}` : "";

    const currencyValueFormated = parseFloat(currencyValue);
    if (!currencyValueFormated) return 1;

    return currencyValueFormated <= 0 ? 1 : currencyValueFormated;
}