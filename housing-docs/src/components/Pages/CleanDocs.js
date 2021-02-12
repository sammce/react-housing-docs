import React from 'react';
import Link from '../Link/Link';
import CaptionedHeading from '../CaptionedHeading/CaptionedHeading';
import PageSkeleton from '../PageSkeleton/PageSkeleton';
import CodeBlock from '../CodeBlock/CodeBlock';
import InlineCode from '../InlineCode/InlineCode';
import Table from '../Table/Table';
import Image from '../Image/Image';
import badDataJPG from '../../static/bad-data-better.jpg';
import redCodePNG from '../../static/red-code.png';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { Typography, Button, Grid } from '@material-ui/core';

function CleanDocs(props) {

  const dataTableHeadings = [
    "Source", "Records", "Columns", "Format", "Quality"
  ]

  const dataTableRows = [
    // name, rowCount, columnCount, fileType, rating
    ["Gov. Averages", "40", "7", "Excel", "5/10"],
    ["Kaggle Register", "359,630", "8", "CSV", "9/10"]
  ]

  const varTableHeadings = [
    "Variable Name", "Data Type", "Description", "Length (Elements)"
  ]

  const varTableRows = [
    // varName, dataType, Description
    ["np", "Module", "The entire numpy module", "N/A"],
    ["pd", "Module", "The pandas module", "N/A"],
    ["os", "Module", "os module to make color codes work", "N/A"],
    ["new_house_data", "DataFrame", "Gov. averages for new houses", "86 x 50"],
    ["second_house_data", "DataFrame", "Gov. averages for second hand houses", "86 x 50"],
    ["new_headings", "Numpy Array", "Array to house headings of new house data excel sheet", "7"],
    ["second_headings", "Numpy Array", "Array to hold headings of second hand excel sheet", "7"],
    ["years", "Numpy Array", "Holds years 1976 - 2016 (from Gov. data)", "40"],
    ["years_from_2010", "Numpy Array", "Holds years 2010 - 2019 (from kaggle data)", "9"],
    ["all_years", "Numpy Array", "Holds years 1976 - 2019 (from Gov. & kaggle data)", "43"],
    ["places", "Numpy Array", "All places from Gov. data", "7"],
    ["places_no_national", "Numpy Array", "Places minus 'National' as it's not in kaggle data", "6"],
    ["new_avg", "DataFrame", "Averages for new houses, sorted by year and place", "40 x 7"],
    ["old_avg", "DataFrame", "Averages for second hand houses", "40 x 7"],
  ]

  return (
    <PageSkeleton active="docs/clean">
        <CaptionedHeading caption="How we cleaned over 360,000 rows of data - Sam">
          Data Cleaning
        </CaptionedHeading>
        
        <Typography variant="h4">
          Our Source
        </Typography>

        <Typography paragraph>
          When we were tasked with analysing a set of data, we immediately set to work finding 
          usable data about a topic which mattered to us. Sam stumbled across 
          the <Link href="https://www.propertypriceregister.ie/website/npsra/pprweb.nsf/PPR?OpenForm">
             Property Price Register
          </Link>, a register of every house sold in Ireland from 2010 to the present day. 
          This website offers a search feature for their database, but this would have terribly painstaking 
          to look through, as we would have to manually enter the details for each listing.
        </Typography>

        <Typography paragraph>
          Luckily for us, we found this <Link href="https://www.kaggle.com/erinkhoo/property-price-register-ireland">
            dataset
          </Link> on <Link href="https://www.kaggle.com">
            Kaggle
          </Link> in which someone had done the work for us. This dataset is extremely comprehensive, as it contains the data for all of the houses 
          on the aforementioned register, a total of ~ 360,000 lines.
        </Typography>

        <Typography paragraph>
          After we had sourced this data, we quickly realised that it didn't mean anything without other data about the houses, 
          such as its size, which was noticeably missing from the dataset and is not easily obtainable. To circumvent this, we decided 
          to go onto the government's website to try and find some of their statistics, where we 
          found <Link href="https://www.gov.ie/en/collection/2a8bf-house-price-statistics/#house-price-by-area">this</Link>. These government calculated 
          averages would allow us to make our algorithm for cleaning and processing the data, and check our results with this data, 
          and then use our algorithm to predict the price of housing in the upcoming years.
        </Typography>

        <Table headings={dataTableHeadings} rows={dataTableRows} />


        <br />
        <Typography variant="h4">
          Data Structures
        </Typography>

        <Typography paragraph>
          Our first idea was to use a python dictionary to store the governments averages, with the following layout:
        </Typography>

        <CodeBlock>
{
`data = {
    1996: {
        'Limerick': {
            'New': 69000,
            'Old': 42000,
        }
    }
}`  
}          
        </CodeBlock>

        <Typography paragraph>
          This worked at first, as it offered an easy way of accessing the data we needed. 
          To get the value for a new 2016 Dublin house, we could simply 
          type <InlineCode>data[1996]['Limerick']['New']</InlineCode> and retrieve the value.
        </Typography>

        <Typography paragraph>
          We kept this setup until we got to the visualisation of the data, when we found out to 
          use <Link href="https://plotly.com/python/">plotly</Link>, our graphing library of choice,
          we would need to use <Link href="https://pandas.pydata.org/">pandas</Link>, or more specifically, a pandas DataFrame. 
          This python module is primarily focused on data analysis and manipulation, paying attention to memory usage 
          and performance in particular. Plotly makes use of this data structure in their API, and using a simple dictionary 
          to house our data greatly limited our visualisation options.
        </Typography>

        <Typography paragraph>
          During this project, we found ourselves using lists quite often, and wanted to improve their performance too. We came to 
          the conclusion that we should implement a more efficient solution in the form 
          of <Link href="https://numpy.org/">numpy</Link> arrays. Similar to DataFrames, numpy arrays offer up to 
          20 times greater speeds than python's built in lists. We found this change helpful as it 
          let us store our data more leniently.
        </Typography>

        <Typography variant="h4">
          Formatting the data
        </Typography>

        <Typography paragraph>
          We had the data, we had the DataFrames to store them, but the raw data looked something
          like this:
        </Typography>

        <Image src={badDataJPG} alt="bad data" />

        <Typography paragraph>
          As you can see, less than ideal. There was over 50 rows and columns with blank cells, so it required a lot of work to make the data useable.
        </Typography>

        <Typography variant="h5">
          Setting up a class
        </Typography>

        <Typography paragraph>
          We decided to create classes for each step in this project, to better modularize our approach, and make it easier for the others
          in the group each other's code. Classes are essentially blueprints for objects, which is what 
          python is made up of. Everything from a string to a list has a class definition like ours.
          If you're bored during quarantine (you most likely will be), 
          this <Link href="https://searchapparchitecture.techtarget.com/definition/object-oriented-programming-OOP">blog post</Link> offers a nice explanation
          as to what Object Oriented Programming (OOP) is all about.
          
        </Typography>

        <CodeBlock 
          gitLink="https://github.com/sammce/housing/blob/main/clean.py#L1-L4"
          line="1">
{
`from formatter import Formatter

class CleanedData(Formatter):
    ...`
}
        </CodeBlock>

        <Typography paragraph>
          <InlineCode>Formatter</InlineCode> is a class we made which you can 
          find <Link href="https://github.com/sammce/housing/blob/main/formatter.py#L1-L37">here</Link>. This class 
          is inherited by each class we made, and added the ability to print coloured text in the console like this:
        </Typography>

        <CodeBlock>
{
`print(self.fatal("Error!"))`
}
        </CodeBlock>

        <Typography paragraph>
          This would print <span style={{color: '#f44336'}}>Error!</span>, and ensured we could display meaningful error messages 
          when something went wrong, or someone used a method incorrectly.
        </Typography>

        <Image src={redCodePNG} alt="red error message"/>
        
        <Typography variant="h5">
          Initialising the class
        </Typography>

        <CodeBlock 
          gitLink="https://github.com/sammce/housing/blob/main/clean.py#L8-L23"
          line="7">

{
`def __init__(self):

    # Reads in data from specific excel files and stores it in 
    # various variables.

    # We import programmatically for uniformity across children classes
    # EG ProccessedData, VisualisedData

    # These classes will not need to import anything in their respective files
    from importlib import import_module
    self.np = import_module('numpy')
    self.pd = import_module('pandas')
    self.os = import_module('os')
    self.sys = import_module('sys')

    # Makes ANSI codes work for formatting
    self.os.system("")
    ...`
}
        </CodeBlock>

        <Typography paragraph>
          In the <InlineCode>__init__</InlineCode> method, which runs whenever we instantiate our class, we imported all of the modules we would need, so that we would only have to import them once 
          across all of our files. This also let us keep track of what modules were being imported and made it easy to switch them in and out.
          We call <InlineCode>os.system("")</InlineCode> as without this, the coloured print methods inherited 
          from <InlineCode>Formatter</InlineCode> wouldn't work.
        </Typography>

        <CodeBlock 
          gitLink="https://github.com/sammce/housing/blob/main/clean.py#L25-L40"
          line="25">
{
`    # Initialise raw DataFrames
    self.new_house_data = self.pd.read_excel('pricing-by-area-new.xlsx')
    self.second_house_data = self.pd.read_excel('pricing-by-area-second.xlsx')

    # Column headings used to traverse raw DataFrame
    self.new_headings = self.np.array(self.new_house_data.columns[1:8])
    self.second_headings = self.np.array(self.second_house_data.columns[1:8])

    # List of all years and places from Data
    # used as row and column identifiers respectively
    self.years = self.np.array([], dtype=int)
    self.places = self.np.array(self.new_house_data.iloc[0][1:8].tolist())
    self.places_no_national = self.np.array(self.new_house_data.iloc[0][2:8].tolist())

    self.clean_averages()`
}
        </CodeBlock>

        <Typography paragraph>
          Next, we setup some useful properties on the <InlineCode>CleanedData</InlineCode> class, 
          such as the raw excel data, the headings for each of them and the years and places included in 
          the data. The excel sheets were malformed when we got them, which explains the ugly code. Pain.

        </Typography>

        <Typography paragraph>
          You can see how we used numpy arrays, which greatly improved the rate at which we could 
          clean and process the data. At the end of <InlineCode>__init__</InlineCode> we 
          call <InlineCode>clean_averages()</InlineCode>. This relates to the government averages. These 
          averages are not compiled into a CSV file to ensure we could adjust our algorithm on the fly.
        </Typography>

        <Typography variant="h5">
          Methods
        </Typography>

        <CodeBlock 
          gitLink="https://github.com/sammce/housing/blob/main/clean.py#L42-L67"
          line="42">
{
`def clean_averages(self):
    # Clean new listings excel sheet
    # also adds each year to an array (CleanedData.years)

    # Create temp dictionary to house data
    data = {}
    for index, row in self.new_house_data.iterrows():
        # index 7 is where valid data starts
        if index < 7:
            continue
        
        year = row['YEAR']

        self.years = self.np.append(self.years, [year])
        if int(year) > 2009:
            self.years_from_2010 = self.np.append(self.years_from_2010, [year])
        

        # Shorthand for looping through each row and rounding each value
        data[year] = list(map(lambda x: round(x), row[self.new_headings].tolist()))

        # index 47 is where valid data ends
        if index == 47:
            break

    self.new_avg = self.pd.DataFrame.from_dict(data, orient='index', columns=self.places)
    ...`
}
        </CodeBlock>

        <Typography paragraph>
          We made this method to take the data from the government excel sheet and remove redundant data, 
          create a list of the years in the study and reshape the DataFrame into a more usable form.
        </Typography>

        <Typography paragraph>
          To do this, we simply created an empty dictionary, looped through the rows in the excel sheet 
          and extracted the data we needed to the dictionary. We then turn this dictionary back into a DataFrame 
          for better read and write speeds, as I said previously.
        </Typography>

        <Typography paragraph>
          The <InlineCode>map</InlineCode> function is a shorthand for looping through an iterable
          and performing an operation on each element. The longhand would look like:
        </Typography>

        <CodeBlock>
{
`for x in row[self.new_headings].tolist():
    data[year] = round(x)`
}
        </CodeBlock>

        <Typography paragraph>
          The code below was executed directly after the code above, but for the second hand excel data:
        </Typography>

        <CodeBlock
          gitLink="https://github.com/sammce/housing/blob/main/clean.py#L69-L85"
          line="68">
{
`# reset data dict
data = {}

# clean old listings excel sheet
for index, row in self.second_house_data.iterrows():
    if index < 7:
        continue
  
    year = row['YEAR']

    data[year] = list(map(lambda x: round(x), row[self.second_headings].tolist()))
    if index == 47:
        break

self.old_avg = self.pd.DataFrame.from_dict(data, orient='index', columns=self.places)

self.all_years = self.np.concatenate((self.years, [2017, 2018, 2019]))`
}
          </CodeBlock>

          <Typography paragraph>
            Because of how new the pandas library was to us, we created methods to search through the data.
            We didn't end up using them much, as we soon became familiar with the methods of pandas, and 
            removed the need for the additional layer of abstraction.
          </Typography>

          <CodeBlock
            gitLink="https://github.com/sammce/housing/blob/main/clean.py#L87-L99"
            line="87">
{
`def get_every_nyears(self, df, n=1):

    # Gets a row from a given DataFrame every n rows.\n
    # Returns a DataFrame.

    # let n = 5
    # let year in row = 2006

    # check would be (year - 1976) % n == 0
    #                      30      % 5 == 0
    # This returns True, so this row would be included in the returned DataFrame
    return df.iloc[[self.years.tolist().index(x) for x in self.years if (x - 1976) % n == 0]]`
}
        </CodeBlock>

        <Typography paragraph>
          This method looks compicated at first glance, but essentially boils down 
          to a loop of <InlineCode>self.years</InlineCode> which checks to see if 
          the current index % (modulus) n is equal to 0, and includes the row if it does. (All in one line!)
        </Typography>

        <CodeBlock>
{
`every_5_years = self.get_every_nyears(self.new_avg, 5)
print(every_5_years)

# Output: 
      National  Dublin    Cork  Galway  Limerick  Waterford  Other Areas
1976     15564   15342   15347   17842     15279      13900        15361
1981     40167   44456   35464   39729     41520      34638        37857
1986     48256   50891   43844   49804     47222      47928        46486
1991     66914   78715   64651   66784     64598      53366        58645
1996     87202   97058   85351   93050     83281      79784        82091
2001    182863  243095  174550  171161    152205     155488       166834
2006    305637  405957  305015  286176    275411     271521       276570
2011    230303  290668  241502  229558    216307     205598       216400
2016    313483  397676  293343  262215    239024     239409       272290`
}
        </CodeBlock>

        <Typography paragraph>
          As you can see, the above method is quite powerful, however we struggled to find
          a use for it. The following methods are quite self explanatory, so I'll let 
          the code speak for itself.
        </Typography>

        <CodeBlock
          gitLink="https://github.com/sammce/housing/blob/main/clean.py#L101-L130"
          line="101">
{
`def get_between(self, df, year1, year2):
    
    # Gets the rows starting with YEAR = year1, and ending with YEAR = year2. (Both inclusive).
    # Returns a DataFrame.
    
    return df.loc[year1 : year2]

def get_location(self, df, location):
    
    # Gets the column of values associated with a location from CleanedData.places.
    # Returns a DataFrame or int (if passed DataFrame only has 1 row).
    
    return df[location.title()]

def get_year(self, df, year):
  
    # Gets the row of the passed year.
    # Returns a DataFrame or int (if passed DataFrame only has 1 column).
    
    return df.loc[int(year)]

def get_at_index(self, df, index):
    return df.iloc[index]

def search(self, df, location, year):
    
    # Gets the int value for the given location from the given year.
    # Returns an int, or prints an error message if no results are found.
    
    return df.loc[int(year), location.title()]`
}
        </CodeBlock>

        <Typography>
          This left us with the following properties:
        </Typography>

        <Table align="left" headings={varTableHeadings} rows={varTableRows}/>

      <Grid container justify="center" style={{marginTop: 30}}>
        <Button 
          href="/docs/process" 
          variant="contained" 
          color="primary" 
          style={{padding: 10}}
          endIcon={<ArrowForwardIcon />}>
          Processing Documentation
        </Button>
      </Grid>
    </PageSkeleton>
  );
}

export default React.memo(CleanDocs);