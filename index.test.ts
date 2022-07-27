import getContrastBetween from './index'
import test from "tape"

const black = { r: 0x0, g: 0x0, b: 0x0 };
const half_grey = { r: 0x80, g: 0x80, b: 0x80 };
const dark_grey = { r: 0x40, g: 0x40, b: 0x40 };
const light_grey = { r: 0xa8, g: 0xa8, b: 0xa8 };
const pale_blue = { r: 0x8a, g: 0x8a, b: 0xff };
const white = { r: 0xff, g: 0xff, b: 0xff };

test('Test Some Known Contrast', function (t) {
    t.plan(9);

    t.equal(getContrastBetween(white, black), "21")
    t.equal(getContrastBetween(white, black, true), 21)
    t.equal(getContrastBetween(black, white), "21")
    t.equal(getContrastBetween(white, white), "1")
    t.equal(getContrastBetween(black, black), "1")

    t.equal(getContrastBetween(white, half_grey), "3.94")
    t.equal(getContrastBetween(half_grey, black), "5.31")
    t.equal(getContrastBetween(white, pale_blue), "2.93")
    t.equal(getContrastBetween(dark_grey, light_grey), "4.36")

});