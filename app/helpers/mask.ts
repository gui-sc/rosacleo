export function maskToCurrency(num: number): string {
    return num.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

export function maskToCep(value: string): string {
    const cep = value.replace(/\D/g, '').slice(0, 8);
    if (cep.length > 5) {
        return `${cep.slice(0, 5)}-${cep.slice(5)}`;
    }
    return cep
}

export function maskToCpf(value: string): string {
    const cpf = value.replace(/\D/g, '').slice(0, 11);
    if (cpf.length > 9) {
        return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`;
    } else if (cpf.length > 6) {
        return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
    } else if (cpf.length > 3) {
        return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
    }
    return cpf;
}

export function maskToPhone(value: string): string {
    const phone = value.replace(/\D/g, '').slice(0, 11);
    if (phone.length > 10) {
        return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;
    } else if (phone.length > 6) {
        return `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6)}`;
    } else if (phone.length > 2) {
        return `(${phone.slice(0, 2)}) ${phone.slice(2)}`;
    }
    return `(${phone}`;
}

export function maskToCardNumber(value: string): string {
    return value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
}

export function maskToCardDate(value: string): string {
    const date = value.replace(/\D/g, '').slice(0, 4);
    if (date.length > 2) {
        return `${date.slice(0, 2)}/${date.slice(2)}`;
    }
    return date;
}

export function maskToCardCVV(value: string): string {
    return value.replace(/\D/g, '').slice(0, 3);
}

