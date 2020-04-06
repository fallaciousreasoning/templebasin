const fs = require('fs');

const getLines = (): string[] => {
    return fs.readFileSync('importer/data.csv', 'utf-8').split('\n');
}

const findRowIndexStartingWith = (rows: string[], start: string): number => {
    for (let i = 0; i < rows.length; ++i) {
        if (rows[i].startsWith(start))
            return i;
    }

    throw new Error("Unable to find row starting with: " + start);
}
const getHeaderIndex = (rows: string[]): number => {
    const headerLooksLike = ",,Name,Type,Notes:,Paid,Room,Status:";
    return findRowIndexStartingWith(rows, headerLooksLike);
}

const getHeaderRow = (rows: string[]): string => {
    return rows[getHeaderIndex(rows)];
}

const getLodgeSplitIndex = (rows: string[]): number => {
    const splitStart = ",61e,Split Top Lodge above Bottom Lodge Below";
    return findRowIndexStartingWith(rows, splitStart);
}

const getEndRowIndex = (rows: string[]): number => {
    const endStart = "O,end,end,end,end,end";
    return findRowIndexStartingWith(rows, endStart);
}

function* onlyRoomInfo(rows: string[]): Iterable<string> {
    const header = getHeaderIndex(rows);
    const split = getLodgeSplitIndex(rows);
    const end = getEndRowIndex(rows);

    for (let i = header + 1; i < end; ++i) {
        if (i === split)
            continue;
        yield rows[i];
    }
}

const lines = onlyRoomInfo(getLines());
for (const roomInfo of lines)
    console.log(roomInfo);