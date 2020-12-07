#!/usr/bin/env python3

# A set of Javascript templates, for use with Python's str.format()

################################################################################

DATA_TEMPLATE='''
var __version__ = "{version}";

var SLOTS = [
{slots}
];

var RECT_SLOTS = [
  "main_implant",
  "body",
  "inoculator",
  "weapon",
  "offhand",
];

// Object constructor
function Enchant(name, str, items, slots, quality, doubled, groups, seasons) {{
  this.name = name;
  this.str = str;
  this.items = items;
  this.slots = slots;
  this.quality = quality;
  this.doubled = doubled;
  this.groups = groups;
  this.seasons = seasons;
}}

var enchants = [
{enchants}
];

var slot_items = new Map([
{item_types}
]);

'''

################################################################################

ENCHANT_TEMPLATE='''new Enchant('{name}',
              "{desc}",
              [{items}],
              [{slots}],
              '{quality}',
              {doubled},
              [{groups}],
              [{seasons}]),
'''
