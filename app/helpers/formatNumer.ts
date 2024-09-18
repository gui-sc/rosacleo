export function formatNumber(num: number): string {
    // convert 1000.50 to 1.000,50
    return num.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}