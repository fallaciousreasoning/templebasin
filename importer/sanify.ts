import { BookingInfo } from "../model/bookingInfo";
import { Guest } from "../model/guest";

const fs = require('fs');

const dayWidth = 6;
const startColumn = 2;

interface IntermediateResult {
    [day: number]: BookingInfo[];
}

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

const parseType = (type: string): Partial<BookingInfo> => {
    type = type.toLowerCase() as 'dbb' | 'sc' | 'pack';

    switch (type) {
        case "dbb":
            return {
                selfCatered: false,
                includeLiftTickets: false
            };
        case "sc":
            return {
                selfCatered: true,
                includeLiftTickets: false
            };
        case "pack":
            return {
                selfCatered: false,
                includeLiftTickets: true
            }
    }

    throw new Error(`Encountered unknown booking type '${type}'`);
}

const isProbablySameGuest = (g1: Guest, g2: Guest) => {
    // The easy case.
    if (g1.name === g2.name)
        return true;

    // TODO: First Last {N}

    return false;
}

const parseBooking = (day: number, rowNumber: number, columnNumber: number, columns: string[]) => {
    const guest = parseGuest(rowNumber, columnNumber, columns);
}

const parseGuest = (rowNumber: number, firstColumn: number, columns: string[]) => {
    const readData = (offset: number) => columns[firstColumn + offset];

    const columnHeadings = [
        "Name",
        "Type",
        "Notes",
        "Paid",
        "Room",
        "Status"
    ];

    const guest: Guest = {
        name: readData(0),
        category: 'Adult',
        clubMember: false,
        dietaryRequirements: []
    };

    return {
        ...guest,
        ...parseType(readData(1))
    };
}

const lines = onlyRoomInfo(getLines());
for (const roomInfo of lines)
    console.log(roomInfo);