import { lightenColor, darkenColor } from "./lighten-color";
import { createMuiTheme } from "@material-ui/core";

export default color => createMuiTheme({
  palette: {
    primary: {
      light: lightenColor(color),
      main: color,
      dark: darkenColor(color),
      contrastText: '#fff',
    },
  },
});
