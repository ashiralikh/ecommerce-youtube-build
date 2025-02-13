export const COPON_CODES = {
   BFRIDAY:"BFRIDAY",
   XMAS2021:"XMAS2021",
   NY2022:"NY2022"
}as const

export type CoponCodes = keyof typeof COPON_CODES

// "10%OFF": "10%OFF",
// "20%OFF": "20%OFF",
// "30%OFF": "30%OFF",
// "40%OFF": "40%OFF",
// "50%OFF": "50%OFF",
// "60%OFF": "60%OFF",
// "70%OFF": "70%OFF",
// "80%OFF": "80%OFF",
// "90%OFF": "90%OFF",
// "100%OFF": "100%OFF",