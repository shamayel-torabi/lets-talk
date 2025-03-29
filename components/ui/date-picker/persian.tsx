import React from "react";

import * as dateFnsJalali from "date-fns-jalali";
import { Locale } from "date-fns-jalali";
import * as locales from "date-fns-jalali/locale";
import { DateLib, DateLibOptions, DayPicker, DayPickerProps } from "react-day-picker";

export const faIR = locales.faIR;
export const enUS = locales.enUS;

/**
 * Render the Persian Calendar.
 *
 * @see https://daypicker.dev/docs/localization#persian-calendar
 */
export function PersianDayPicker(
  props: DayPickerProps & {
    /**
     * The locale to use in the calendar.
     *
     * @default `faIR`
     */
    locale?: Partial<Locale> | undefined;
    /**
     * The direction of the text in the calendar.
     *
     * @default `rtl`
     */
    dir?: DayPickerProps["dir"];
    /**
     * The date library to use in the calendar.
     *
     * @default `jalaliDateLib` from `date-fns-jalali`
     */
    dateLib?: DayPickerProps["dateLib"];
    /**
     * The numeral system to use when formatting dates.
     *
     * - `latn`: Latin (Western Arabic)
     * - `arab`: Arabic-Indic
     * - `arabext`: Eastern Arabic-Indic (Persian)
     * - `deva`: Devanagari
     * - `beng`: Bengali
     * - `guru`: Gurmukhi
     * - `gujr`: Gujarati
     * - `orya`: Oriya
     * - `tamldec`: Tamil
     * - `telu`: Telugu
     * - `knda`: Kannada
     * - `mlym`: Malayalam
     *
     * @defaultValue `arabext` Eastern Arabic-Indic (Persian)
     * @see https://daypicker.dev/docs/translation#numeral-systems
     */
    numerals?: DayPickerProps["numerals"];
  }
) {
  const dateLib = getDateLib({
    locale: props.locale as Locale,
    weekStartsOn: props.broadcastCalendar ? 1 : props.weekStartsOn,
    firstWeekContainsDate: props.firstWeekContainsDate,
    useAdditionalWeekYearTokens: props.useAdditionalWeekYearTokens,
    useAdditionalDayOfYearTokens: props.useAdditionalDayOfYearTokens,
    timeZone: props.timeZone
  });
  
  return (
    <DayPicker
      {...props}
      locale={props.locale ?? faIR}
      numerals={props.numerals ?? "arabext"}
      dir={props.dir ?? "rtl"}
      dateLib={dateLib}
    />
  );
}

/** Returns the date library used in the calendar. */
export const getDateLib = (options?: DateLibOptions) => {
  return new DateLib(options, dateFnsJalali);
};
