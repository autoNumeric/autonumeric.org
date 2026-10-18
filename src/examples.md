---
layout: AnPage
title: Examples
lead: Live inputs for the predefined options, each with the code that produces it.
wide: true
---

Each example comes with a live input you can play with, and the options used to get that result. To build your own format, use the [configurator](/configurator).

## Predefined language options

These predefined options directly set the format and currency of a country.

<ExampleGroup group="languageOptions" />

## Predefined common options

The common formats: integers, floats and numeric strings.

<ExampleGroup group="commonOptions" />

## Predefined monetary options

Euro and dollar variants.

<ExampleGroup group="commonMonetaryOptions" />

## Predefined percentage options

These options set `rawValueDivisor`, so that when you type `75%`, the `rawValue` is automatically `0.75`.

<ExampleGroup group="commonPercentageOptions" />

## Predefined style rules

The `styleRules` option changes the CSS classes of the element whenever its value matches a value or a range you defined, using callbacks.

<ExampleGroup group="styleRules" />
