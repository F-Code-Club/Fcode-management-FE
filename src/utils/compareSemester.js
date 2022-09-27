const semester = ['SP', 'SU', 'FA', 'WI'];

const regex = new RegExp(`(${semester.join('|')})(\\d+)`, 'gi');

/**
 * Compare function for FPTU semesters
 * @param {String} s1
 * @param {String} s2
 * @returns 1, -1 or 0
 */

const compareSemester = (s1, s2) => {
    try {
        let token1 = [];
        let token2 = [];

        for (const match of s1.matchAll(regex)) {
            token1 = match;
        }

        for (const match of s2.matchAll(regex)) {
            token2 = match;
        }

        token1[2] = parseInt(token1[2]);
        token2[2] = parseInt(token2[2]);

        const s1Point = semester.indexOf(token1[1]) / 100 + token1[2];
        const s2Point = semester.indexOf(token2[1]) / 100 + token2[2];

        if (s1Point > s2Point) {
            return -1;
        } else if (s1Point < s2Point) {
            return 1;
        } else {
            return 0;
        }
    } catch {
        throw new Error('Invalid semester format. Semester format must be matching ' + regex);
    }
};

export default compareSemester;
