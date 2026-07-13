# Data Model: Quran Khatma Tracker

## Entities

### ReaderProfile

Represents the reader using the tracker on the current device.

| Field | Type | Required | Validation / Notes |
|-------|------|----------|--------------------|
| readerName | string | yes | Trimmed non-empty Arabic or user-entered name; shown in the header greeting |
| startDate | string | no | ISO timestamp saved for future features; not displayed in MVP |

### AyahReference

Represents one endpoint of a daily reading range.

| Field | Type | Required | Validation / Notes |
|-------|------|----------|--------------------|
| surah | string | yes | Full surah name exactly as provided by the fixed reading plan |
| ayah | number | yes for most endpoints | Positive ayah number; day 40 end may use an end-of-surah marker for `النَّاس` |
| isEndOfSurah | boolean | no | True only when the range ends at the final ayah without a displayed number |

### DayPlan

Represents one of the 40 fixed reading portions.

| Field | Type | Required | Validation / Notes |
|-------|------|----------|--------------------|
| id | number | yes | Integer from 1 to 40; unique and stable |
| from | AyahReference | yes | Start of the reading range |
| to | AyahReference | yes | End of the reading range |
| completed | boolean | yes | Defaults to false; can be toggled in any order |
| dateCompleted | string | no | ISO timestamp set when toggled complete; removed when toggled incomplete |

### AppState

Represents all persisted MVP state for one device.

| Field | Type | Required | Validation / Notes |
|-------|------|----------|--------------------|
| readerName | string | yes after onboarding | Missing or empty value triggers onboarding |
| days | DayPlan[] | yes | Must contain exactly 40 day records; invalid or missing data falls back to a fresh plan |
| startDate | string | no | ISO timestamp created on first completed onboarding or first app start after onboarding |

### KhatmaProgress

Derived state for display only; it is not stored separately.

| Field | Type | Rule |
|-------|------|------|
| completedCount | number | Count of completed DayPlan records |
| percentage | number | `completedCount / 40`, rounded to nearest whole percent for display |
| suggestedCurrentDayId | number or null | Lowest-numbered incomplete day; null when all 40 days are complete |
| isComplete | boolean | True when completedCount is 40 |

## Relationships

- AppState contains one ReaderProfile-like reader name and hidden start date.
- AppState contains exactly 40 DayPlan records derived from the fixed ReadingPlanDataset.
- KhatmaProgress is derived from AppState.days each time state changes.
- Day cards read one DayPlan at a time and write only that day completion state through direct toggles.

## State Transitions

### Onboarding

1. No valid readerName exists.
2. Reader submits a non-empty name.
3. AppState is created with the fixed 40-day plan, empty completions, and hidden startDate.
4. Dashboard renders personalized greeting.

### Edit Name

1. Existing reader opens header settings.
2. Reader submits a non-empty new name.
3. AppState.readerName updates immediately.
4. Header greeting reflects the updated name.

### Toggle Day Complete

1. Reader taps any day card or uses the suggested-day shortcut.
2. If incomplete, the toggle sets completed true and stores dateCompleted.
3. If complete, the toggle sets completed false and removes dateCompleted immediately.
4. KhatmaProgress recalculates immediately.

### Reset

1. Reader selects `ابدأ من جديد`.
2. Confirmation appears.
3. Cancel leaves all state unchanged.
4. Confirm clears readerName, startDate, completions, and completion dates.
5. Onboarding appears again.

### Completion Celebration

1. completedCount reaches 40.
2. App shows `مبروك! ختمت القرآن في ٤٠ يوم 🎉`.
3. Reader may close the modal or choose reset/start again.

## Validation Rules

- Reader name must be trimmed and non-empty.
- Day ids must be unique integers from 1 through 40.
- Completion can be toggled for any day regardless of other day states.
- Corrupt, missing, or incompatible stored state falls back to fresh onboarding.
- Saved states do not expire, including states older than 100 days.
- Compact cards show the day label separately and the full reading range below on one no-wrap line without repeating the surah name in the day label.
