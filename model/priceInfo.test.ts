import { determinePrice, PriceInfo } from "./priceInfo";
import { Guest, AccomodationCategory } from "./guest";

const guest = (clubMember: boolean, category: AccomodationCategory): Guest => ({
    category,
    clubMember,
    dietaryRequirements: [],
    name: `Test Guest ${clubMember} ${category}`
});

test("Club member price is not used for non members", () => {
    const priceInfo: PriceInfo = {
        default: 10,
        clubMember: 5
    };

    const price = determinePrice(guest(false, AccomodationCategory.Adult),
        priceInfo);
    expect(price).toBe(priceInfo.default);
});

test("Club member price is preferred for members", () => {
    const priceInfo: PriceInfo = {
        default: 10,
        clubMember: 5
    };

    const price = determinePrice(guest(true, AccomodationCategory.Adult),
        priceInfo);
    expect(price).toBe(priceInfo.clubMember);
});

test("Category price number overrides default", () => {
    const priceInfo: PriceInfo = {
        default: 10,
        clubMember: 7,
        adult: 5
    };

    let price = determinePrice(guest(false, AccomodationCategory.Adult),
        priceInfo);
    expect(price).toBe(priceInfo.adult);

    price = determinePrice(guest(true, AccomodationCategory.Adult),
        priceInfo);
    expect(price).toBe(priceInfo.adult);
});

test("Category price is preferred", () => {
    const priceInfo: PriceInfo = {
        default: 10,
        clubMember: 7,
        student: {
            default: 6,
            clubMember: 4
        }
    };

    let price = determinePrice(guest(false, AccomodationCategory.Student), priceInfo);
    expect(price).toBe(priceInfo.student['default']);

    price = determinePrice(guest(true, AccomodationCategory.Student), priceInfo);
    expect(price).toBe(priceInfo.student['clubMember']);

    delete priceInfo.student['clubMember'];
    price = determinePrice(guest(true, AccomodationCategory.Student), priceInfo);
    expect(price).toBe(priceInfo.student['default']);
});

test("If club price is lower than category price, it is used instead", () => {
    const priceInfo: PriceInfo = {
        default: 10,
        clubMember: 4,
        adult: {
            default: 5
        }
    };

    let price = determinePrice(guest(true, AccomodationCategory.Adult),
        priceInfo);
    expect(price).toBe(priceInfo.clubMember);

    priceInfo.adult = 5;
    price = determinePrice(guest(true, AccomodationCategory.Adult),
        priceInfo);
    expect(price).toBe(priceInfo.clubMember);
});

test('No base price needs to be provided', () => {
    const priceInfo: PriceInfo = {
        adult: {
            default: 5
        }
    };

    expect(determinePrice(guest(true, AccomodationCategory.Adult), priceInfo))
        .toBe(priceInfo.adult['default']);
});