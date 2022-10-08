/**
 * You can use the gutter property of Row as grid spacing, we recommend set it to (16 + 8n) px (n stands for natural number).
 * -- Ant design suggestion
 *
 * @param {number} n natural number
 */

const getGutter = (n) => 16 + 8 * n;

export default getGutter;
