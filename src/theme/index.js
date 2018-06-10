import { getMuiTheme, darkBaseTheme, colors } from 'material-ui/styles';


const common = {
    fontFamily: '"Open Sans", sans-serif',
    palette: {
        primary1Color: '#F37021',
        primary2Color: '#FF8438',
        accent1Color: '#f99d1c',
        pickerHeaderColor: '#F37021',
        white: '#FFFFFF'
    },
    appBar: {
        color: '#fff',
        textColor: '#777'
    },
    textField: {
        floatingLabelColor: '#78909C',
        borderColor: '#9daeb6'
    },
};

const ubpBaseTheme = getMuiTheme(common);
const ubpBaseThemeDark = getMuiTheme(darkBaseTheme, common, {
    palette: {
        canvasColor: '#37474F',
    },
    appBar: {
        color: common.palette.primary1Color,
        textColor: '#fff'
    },
    tableHeaderColumn: {
        textColor: colors.blueGrey500
    }
});

export {
    ubpBaseTheme,
    ubpBaseThemeDark
};

