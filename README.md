# SlotG - Time Slot Generator

#### Available as an [NPM Package](https://www.npmjs.com/package/@mollahdev/slot-g).

**Install with NPM:**
```sh
npm i @mollahdev/slot-g
```

> Generate time slots between a time range.
> Disable single/multiple specific slot.
> Get Formated/Non-formated time slot.
> Get dynamically gap slots.

### Options

-   **start: 0** -> starting minute
-   **end: 1440** -> ending minutues (set 1440 for 24 hours)
-   **gap: 30** -> each slot gap by minutes
-   **ampm: true** -> get am/pm as suffix
-   **noTime: false** -> enable when you need slots minitues only
-   **disabled: []** -> [ [0, 480], [480, 600] ] nested array contains disabled slots [startMintues, endMinitues]
-   **formatedHours: true** -> get formated hours

### Get full day slots by 30 minitues gap (Default)

```jsx
import slotg from '@mollahdev/slot-g'

const slots = slotg();
console.log(slots)

// output
{
    "0": "12:00 AM",
    "30": "12:30 AM",
    "60": "01:00 AM",
    "90": "01:30 AM",
    ...
    "1380": "11:00 PM",
    "1410": "11:30 PM"
}

```

### Get slots between 10am to 7pm by 45 minutes gap

```jsx
import slotg from '@mollahdev/slot-g'

const slots = slotg({
	gap: 45, // set the gap by minutes
	start: 600, // 10 * 60
	end: 1140 // 19 * 60
});

console.log(slots)

// output
{
    "600": "10:00 AM",
    "645": "10:45 AM",
    "690": "11:30 AM",
    "735": "12:15 PM",
    "780": "01:00 PM",
    "825": "01:45 PM",
    "870": "02:30 PM",
    "915": "03:15 PM",
    "960": "04:00 PM",
    "1005": "04:45 PM",
    "1050": "05:30 PM",
    "1095": "06:15 PM"
}

```

### Get slots between 10am to 7pm by 1 hour gap without counting 12pm to 3pm with no formated hours

```jsx
import slotg from '@mollahdev/slot-g'

const slots = slotg({
	gap: 60,
	start: 600,
	end: 1140,
    disabled: [ [720, 900] ],
    formatedHours: false,
});

console.log(slots)

// output
{
    "600": "10:00 AM",
    "660": "11:00 AM",
    "900": "15:00 PM",
    "960": "16:00 PM",
    "1020": "17:00 PM",
    "1080": "18:00 PM"
}
```