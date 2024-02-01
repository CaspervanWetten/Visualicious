import { setLoading, setData, data} from "./index.js";

var dummyData = {'2012MM01': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 43160.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2012 januari'}, '2012MM02': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 39245.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2012 februari'}, '2012MM03': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 43521.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2012 maart'}, '2012MM04': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 38568.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2012 april'}, '2012MM05': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 40725.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2012 mei'}, '2012MM06': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 38831.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2012 juni'}, '2012MM07': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 38019.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2012 juli'}, '2012MM08': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 40756.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2012 augustus'}, '2012MM09': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 41298.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2012 september'}, '2012MM10': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 47152.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2012 oktober'}, '2012MM11': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 46646.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2012 november'}, '2012MM12': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 42264.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2012 december'}, '2013MM01': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 41232.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2013 januari'}, '2013MM02': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 39430.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2013 februari'}, '2013MM03': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 41241.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2013 maart'}, '2013MM04': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 39921.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2013 april'}, '2013MM05': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 42032.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2013 mei'}, '2013MM06': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 40392.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2013 juni'}, '2013MM07': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 40644.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2013 juli'}, '2013MM08': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 40271.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2013 augustus'}, '2013MM09': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 41962.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2013 september'}, '2013MM10': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 45920.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2013 oktober'}, '2013MM11': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 44002.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2013 november'}, '2013MM12': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 41569.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2013 december'}, '2014MM01': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 42054.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2014 januari'}, '2014MM02': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 38331.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2014  februari'}, '2014MM03': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 40427.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2014 maart'}, '2014MM04': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 38399.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2014 april'}, '2014MM05': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 36803.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2014 mei'}, '2014MM06': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 36076.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2014 juni'}, '2014MM07': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 35408.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2014 juli'}, '2014MM08': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 35224.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2014 augustus'}, '2014MM09': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 37335.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2014 september '}, '2014MM10': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 40383.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2014 oktober'}, '2014MM11': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 38770.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2014 november'}, '2014MM12': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 37385.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2014 december'}, '2015MM01': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 36507.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2015 januari'}, '2015MM02': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 34482.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2015  februari'}, '2015MM03': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 36914.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2015 maart'}, '2015MM04': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 34652.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2015 april'}, '2015MM05': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 35103.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2015 mei'}, '2015MM06': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 34429.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2015 juni'}, '2015MM07': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 34426.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2015 juli'}, '2015MM08': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 33487.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2015 augustus'}, '2015MM09': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 36250.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2015 september'}, '2015MM10': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 38734.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2015 oktober'}, '2015MM11': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 38336.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2015 november'}, '2015MM12': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 37511.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2015 december'}, '2016MM01': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 33856.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2016 januari'}, '2016MM02': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 33236.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2016  februari'}, '2016MM03': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 33079.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2016 maart'}, '2016MM04': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 32031.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2016 april'}, '2016MM05': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 32199.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2016 mei'}, '2016MM06': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 31796.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2016 juni'}, '2016MM07': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 29890.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2016 juli'}, '2016MM08': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 31032.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2016 augustus'}, '2016MM09': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 32930.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2016 september'}, '2016MM10': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 33743.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2016 oktober'}, '2016MM11': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 33260.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2016 november'}, '2016MM12': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 32310.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2016 december'}, '2017MM01': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 29829.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2017 januari'}, '2017MM02': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 28566.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2017 februari'}, '2017MM03': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 32311.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2017 maart'}, '2017MM04': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 26321.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2017 april'}, '2017MM05': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 28472.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2017 mei'}, '2017MM06': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 26437.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2017 juni'}, '2017MM07': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 27658.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2017 juli'}, '2017MM08': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 26596.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2017 augustus'}, '2017MM09': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 26473.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2017 september'}, '2017MM10': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 28811.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2017 oktober'}, '2017MM11': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 27147.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2017 november'}, '2017MM12': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 24980.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2017 december'}, '2018MM01': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 26129.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2018 januari '}, '2018MM02': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 22777.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2018 februari'}, '2018MM03': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 23997.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2018 maart'}, '2018MM04': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 23350.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2018 april'}, '2018MM05': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 24077.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2018 mei'}, '2018MM06': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 22556.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2018 juni'}, '2018MM07': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 23859.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2018 juli'}, '2018MM08': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 24453.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2018 augustus'}, '2018MM09': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 24439.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2018 september'}, '2018MM10': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 27363.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2018 oktober'}, '2018MM11': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 26746.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2018 november'}, '2018MM12': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 24334.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2018 december'}, '2019MM01': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 23395.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2019 januari'}, '2019MM02': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 22050.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2019 februari'}, '2019MM03': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 24380.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2019 maart'}, '2019MM04': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 23719.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2019 april'}, '2019MM05': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 23429.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2019 mei'}, '2019MM06': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 22075.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2019 juni'}, '2019MM07': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 23932.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2019 juli'}, '2019MM08': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 23291.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2019 augustus'}, '2019MM09': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 23804.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2019 september'}, '2019MM10': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 26377.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2019 oktober'}, '2019MM11': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 25904.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2019 november'}, '2019MM12': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 24925.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2019 december'}, '2020MM01': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 24728.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2020 januari'}, '2020MM02': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 23381.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2020 februari'}, '2020MM03': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 20131.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2020 maart'}, '2020MM04': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 16564.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2020 april'}, '2020MM05': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 17775.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2020 mei'}, '2020MM06': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 20412.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2020 juni'}, '2020MM07': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 22948.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2020 juli'}, '2020MM08': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 22582.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2020 augustus'}, '2020MM09': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 23984.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2020 september'}, '2020MM10': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 23140.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2020 oktober'}, '2020MM11': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 22439.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2020 november'}, '2020MM12': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 18786.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2020 december'}, '2021MM01': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 15929.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2021 januari'}, '2021MM02': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 12227.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2021 februari'}, '2021MM03': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 16248.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2021 maart'}, '2021MM04': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 15045.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2021 april'}, '2021MM05': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 17864.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2021 mei'}, '2021MM06': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 18990.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2021 juni'}, '2021MM07': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 20269.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2021 juli'}, '2021MM08': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 20202.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2021 augustus'}, '2021MM09': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 21530.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2021 september'}, '2021MM10': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 22759.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2021 oktober'}, '2021MM11': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 22657.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2021 november'}, '2021MM12': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 18611.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2021 december'}, '2022MM01': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 17685.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2022  januari'}, '2022MM02': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 18794.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2022 februari'}, '2022MM03': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 22885.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2022 maart'}, '2022MM04': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 20584.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2022 april'}, '2022MM05': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 22436.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2022 mei'}, '2022MM06': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 22460.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2022 juni'}, '2022MM07': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 23170.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2022 juli'}, '2022MM08': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 23810.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2022 augustus'}, '2022MM09': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 24436.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2022 september'}, '2022MM10': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 26337.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2022 oktober'}, '2022MM11': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 25920.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2022 november'}, '2022MM12': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 22955.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2022 december'}, '2023MM01': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 23741.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2023 januari'}, '2023MM02': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 22103.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2023 februari'}, '2023MM03': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 23865.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2023 maart'}, '2023MM04': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 22620.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2023 april'}, '2023MM05': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 24469.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2023 mei'}, '2023MM06': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 24523.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2023 juni'}, '2023MM07': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 24506.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2023 juli'}, '2023MM08': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 23784.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2023 augustus'}, '2023MM09': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 23774.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2023 september'}, '2023MM10': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 26185.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2023 oktober'}, '2023MM11': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 24491.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2023 november'}, '2023MM12': {'SoortMisdrijf': '0.0.0', 'WijkenEnBuurten': 'NL00      ', 'GeregistreerdeMisdrijven': 21887.0, 'WijkenEnBuurtenRaw': 'Nederland', 'SoortMisdrijfRaw': 'Totaal misdrijven', 'PeriodenRaw': '2023 december'}};

setData(dummyData);
console.log(data);