// Define a filter object. This provides the enchant table everything it
// needs to down-select the desired enchants.
function Filter(str, slots, qualities) {
  this.str = str;
  this.slots = slots;
  this.qualities = qualities;
}

var empty_filter = new Filter(null, new Set([]), new Set(['primary']));

function toggle_control_status(control, tag='active') {
  control.classList.toggle(tag);
}
function get_control_status(control, tag='active') {
  return control.classList.contains(tag);
}
function refresh_table(app) {
  // Vue doesn't detect object mutation. Manually trigger refresh.
  app.$root.$emit('bv::refresh::table', 'enchants');
}

var app = new Vue({
  el: "#app",
  data: {
    enchants: enchants,
    current_filter: empty_filter,
    enchant_fields: [
      { key:'quality', label: '', sortable:false },
      { key:'str', label:'Enchant Name', sortable:true },
      { key:'show_details', label:'', sortable:false },
    ],
  },
  methods: {
    filter_function(enchant, filter) {
      // Filter by quality
      if (!filter.qualities.has(enchant.quality)) {
        return false;
      }
      // Filter by slot
      if (filter.slots.size>0) {
        if (!enchant.slots.some(x => filter.slots.has(x))) {
          return false;
        }
      }

      return true; // Display if not filtered out
    },
    clear_filter() {
      this.current_filter = empty_filter;
    },
    select_quality(event, quality) {
      let button = event.target;
      // Update control
      toggle_control_status(button);
      // Update filter
      if (get_control_status(button)) {
        this.current_filter.qualities.add(quality);
      } else {
        this.current_filter.qualities.delete(quality);
      }
      refresh_table(this);
    },
    select_slot(event, slot) {
      let button = event.target;
      // Update control
      toggle_control_status(button);
      // Update filter
      if (get_control_status(button)) {
        this.current_filter.slots.add(slot);
      } else {
        this.current_filter.slots.delete(slot);
      }
      refresh_table(this);
    },
    select_enchant(enchant, idx, event) {
      console.log(enchant);
    }
  }
});

