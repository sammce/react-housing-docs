import React from 'react';
import Link from '../Link/Link';
import CaptionedHeading from '../CaptionedHeading/CaptionedHeading';
import PageSkeleton from '../PageSkeleton/PageSkeleton';
import CodeBlock from '../CodeBlock/CodeBlock';
import InlineCode from '../InlineCode/InlineCode';
import Table from '../Table/Table';
import Image from '../Image/Image';
import Graph from '../Graph/Graph';
import filteringMessagePNG from '../../static/filtering-message.png';
import averageComparisonPNG from '../../static/average-comparison.png';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { Typography, Button, Grid } from '@material-ui/core';

function ProcessedDocs(props) {

  const varTableHeadings = [
    "Variable Name", "Data Type", "Description", "Length (Elements)"
  ]

  const varTableRows = [
    // varName, dataType, Description
    ["raw_data", "DataFrame", "Kaggle data including outliers", "359,629"],
    ["cleaned_data", "DataFrame", "Kaggle data excluding outliers", "~260,000"],
    ["outlier_dict", "Dictionary", "Contains outlier boundaries", "3 x 6"],
    ["new_change", "DataFrame", "% Increase from one year to next for new houses", "40 x 7"],
    ["old_change", "DataFrame", "% Increase for second hand houses", "40 x 7"],
  ]

  return (
    <PageSkeleton active="docs/process">
      <CaptionedHeading caption="Millions of calculations in seconds - Óran">
        Data Processing
      </CaptionedHeading>

      <Typography variant="h4">
        Our plan
      </Typography>

      <Typography paragraph>
        Our goal in this project was to calculate data that is meaningful, and portray it in a way 
        that is easy to comprehend, and also to predict what will happen in the future. To do this, we 
        would need to crunch a lot of numbers.
      </Typography>

      <Typography paragraph>
        We not only needed to make algorithms to calculate averages within a minor margin of error,
        we also needed to compare different values for additional context to 
        our <Link to="/findings">findings</Link>.
      </Typography>

      <Typography variant="h4">
        Inheriting CleanedData
      </Typography>

      <CodeBlock
        gitLink="https://github.com/sammce/housing/blob/main/process.py#L1-L3"
        line="1">
{
`from clean import CleanedData

class ProcessedData(CleanedData):`
}
        </CodeBlock>

        <Typography paragraph>
          The above code gave us access to the methods in <InlineCode>CleanedData</InlineCode> without 
          having to write them again. To setup the object properly however, we had to include the following 
          code in the <InlineCode>__init__</InlineCode> method of this class:
        </Typography>

        <CodeBlock
          gitLink="https://github.com/sammce/housing/blob/main/process.py#L5-L7"
          line="5">
{
`def __init__(self, new=False):
    # create cleaned object
    super().__init__()`
}
        </CodeBlock>

        <Typography paragraph>
          The <InlineCode>super</InlineCode> function instantiates an instance of the superclass,
          or the class being inherited. The advantage that this offers is it 
          allows multiple inheritance and doesn't require you to hard code the name of the 
          class you want to instantiate. It's the same as doing:
        </Typography>

        <CodeBlock>
{
`def __init__(self):
    CleanedData().__init__()`
}
        </CodeBlock>

        <Typography paragraph>
          
        </Typography>

        <Typography paragraph>
          <InlineCode>new</InlineCode> is a keyword argument that specifies whether the class 
          should process new averages or not. It defaults to <InlineCode>False</InlineCode>, but 
          if you want to change that, you create an instance of the class like this:
        </Typography>

        <CodeBlock>
{
`processed = ProcessedData(new=True)`
}
        </CodeBlock>

        <Typography variant="h4">
          Removing Outliers
        </Typography>

        <CodeBlock
          gitLink="https://github.com/sammce/housing/blob/main/process.py#L9-L37"
          line="9">
{
`self.raw_data = self.pd.read_csv("with_outliers.csv")
self.cleaned_data = self.pd.read_csv("cleaned.csv")

self.outlier_dict = {
    'min': {
        'Dublin': 218000,
        'Cork': 145000,
        'Galway': 90000,
        'Limerick': 120000,
        'Waterford': 100000,
        'Other Areas': 110000
    },
    'max': {
        'Dublin': 645000,
        'Cork': 550000,
        'Galway': 520000,
        'Limerick': 490000,
        'Waterford': 550000,
        'Other Areas': 600000,
    },
    'new': {
        'Dublin': -0.1,
        'Cork': 0,
        'Galway': 0.55,
        'Limerick': 0.38,
        'Waterford': 0.63,
        'Other Areas': 0.26,
    }
}`
}
        </CodeBlock>

        <Typography paragraph>
          The first two lines of the above code read in data from two csv files created by us. We had to 
          create the algorithm first, but once we had stored our results in CSV files, we read them back in 
          so that we could test our margin of error.
        </Typography>

        <Typography paragraph>
          <InlineCode>self.outlier_dict</InlineCode> is a dictionary in which we could define minimum and 
          maximum values for each area, and also a multiplier to add to the new houses. Only values which fell in 
          its respective range (E.G. Dublin: 218,000 - 645,000, or a range of 427,000). This allowed us 
          to use trial and error to find accurate outlier filters, as writing a script to do it 
          for us would have taken longer.
        </Typography>

        <CodeBlock
          gitLink="https://github.com/sammce/housing/blob/main/process.py#L39-L42"
          line="39">
{
`self.get_change()
if new:
    self.clean_raw_prices(self.outlier_dict)
    self.test_averages()`
}
        </CodeBlock>

        <Typography paragraph>
          <InlineCode>self.get_change()</InlineCode> is a method defined further into the files which calculates 
          the percentage increase of the average from 1 year to the next. It'll be explained further down.
        </Typography>

        <Typography paragraph>
          The if statement checks for the <InlineCode>new</InlineCode> parameter, and only 
          runs the 2 methods if it's true, like I explained above.
        </Typography>

        <Typography variant="h4">
          Methods
        </Typography>

        <CodeBlock
          gitLink="https://github.com/sammce/housing/blob/main/process.py#L44-L58"
          line="44">
{
`def get_median(self, df, column_label):
    return df.[column_label].median()

def get_mode(self, df, column_label):
    return df.[column_label].mode()

def get_mean(self, df, column_label):
    return df.[column_label].mean()

def get_frequency(self, data_list):
    data = self.pd.Series(data_list)
    return data.value_counts()

def get_min_max(self, data_list):
    return min(data_list), max(data_list)`
}
        </CodeBlock>

        <Typography paragraph>
          Like in <InlineCode>CleanedData</InlineCode>, the above methods were ones we made originally,
          but phased out once we became comfortable with the workflow of pandas.
        </Typography>

        <CodeBlock
          gitLink="https://github.com/sammce/housing/blob/main/process.py#L60-L84"
          line="60">
{
`def get_change(self):
    for index, frame in enumerate([self.new_avg, self.old_avg]):
        data = {}
        for year in self.years[1:]:
            row = self.get_year(frame, year)
            prev_row = self.get_year(frame, year - 1)
            row_values = []

            for place in self.places:
                place_value = self.get_location(row, place)
                prev_place_value = self.get_location(prev_row, place)

                difference = place_value - prev_place_value
                percentage = round((difference / prev_place_value) * 100, 2)

                row_values.append({'numerical':difference, 'percent':percentage})
            data[year] = row_values

        # appends the DataFrame remade with the calculated percentages dict above to self.change_frames
        if index == 0:
            self.new_change = self.pd.DataFrame.from_dict(data, orient="index", columns=self.places)
        else:
            self.old_change = self.pd.DataFrame.from_dict(data, orient="index", columns=self.places)`
}
        </CodeBlock>

        <Typography paragraph>
          The <InlineCode>get_change</InlineCode> method considers each possible combination 
          of place, price and whether or not the house is new or second hand, and calculates how 
          much the average increased from the previous year. It calculates the percentage increase 
          (or decrease) and the numerical value. It stores these values in a dictionary, then 
          we use this dictionary to form 2 new DataFrames, one for new houses and one for second hand.
        </Typography>

        <CodeBlock
          gitLink="https://github.com/sammce/housing/blob/main/process.py#L86-L114"
          line="86">
{
`def clean_raw_prices(self, outlier_dict):
    df = self.raw_data
    dataframes = []
    for place in self.places_no_national:
        old_df = df[
            (df['County'] == place) & (df['Description'] == 'Second') & 
            (df['Price'] < outlier_dict['max'][place]) & 
            (df['Price'] > outlier_dict['min'][place])
        ]
        new_df = df[
            # get all where county = current place, condition = new
            (df['County'] == place) & (df['Description'] == 'New') & 

            # and where price is less than the max value + new multiplier
            (df['Price'] < outlier_dict['max'][place] + 
            outlier_dict['max'][place]*outlier_dict['new'][place]) & 

            # and where price is more than the min value + new multiplier
            (df['Price'] > outlier_dict['min'][place] + 
            outlier_dict['min'][place]*outlier_dict['new'][place])
        ]
        dataframes.append(old_df)
        dataframes.append(new_df)
    df = self.pd.concat(dataframes)
    df.to_csv('cleaned.csv')
    print(self.success("Data cleaned!"))
    print(self.bold("359,629"), end=" ")
    print(self.success("rows became"), end=" ")
    print(self.bold(f"{self.tidy_comma_number(len(df.index))}"), end="\\n\\n")`
}
        </CodeBlock>

        <Typography paragraph>
          This method loops through each place in the data, and filters out the properties 
          which fall outside the range defined for that place 
          in <InlineCode>outlier_dict</InlineCode>. If the house is new, we add whatever percentage 
          is set in the dictionary for that place also. It adds the filtered DataFrames to a list, 
          and compiles them into one big DataFrame using <InlineCode>pd.concat</InlineCode>. It then
          stores this DataFrame in <InlineCode>cleaned.csv</InlineCode> so that we can test it in the 
          upcoming methods.
        </Typography>

        <Typography paragraph>
          At the end of the data, it prints an informative message with the amount of rows filtered out.
        </Typography>

        <Image src={filteringMessagePNG} alt="Row count in new DataFrame" />

        <Typography variant="h4">
          Testing our data
        </Typography>

        <CodeBlock
          gitLink="https://github.com/sammce/housing/blob/main/process.py#L116-L145"
          line="116">
{
`def test_averages(self):
    year = 2015
    new = False

    if new:
        gov_df = self.new_avg
        our_df = self.cleaned_data[self.cleaned_data['Description'] == 'New']
    else: 
        gov_df = self.old_avg
        our_df = self.cleaned_data[self.cleaned_data['Description'] == 'Second']

    for place in self.places_no_national:
        gov_avg = gov_df.loc[year, place]
        our_mean = our_df[(our_df['Year'] == year) & 
        (our_df['County'] == place)]['Price'].mean()
        

        if new:
            our_avg = round(
              our_mean + (our_mean * self.new_change.loc[year, place]["percent"]*0.01 )
            )
        else: 
            our_avg = round(
              our_mean + (our_mean * self.old_change.loc[year, place]["percent"]*0.01 )
            )
        
        print(self.success('Place: ') + self.bold(place))
        print(self.nice('Government average: ') + self.bold(str(gov_avg)))
        print(self.nice('Our computed average: ') + self.bold(str(our_avg)))
        print(self.nice('Difference: ') + self.bold(str(our_avg - gov_avg)), end="\\n\\n")`
}
        </CodeBlock>

        <Typography paragraph>
          After we have processed all of this data, we need to make sure our algorithm is effective, 
          so we compare our findings to the government excel data. 
          In <InlineCode>test_averages</InlineCode>, we can simply change <InlineCode>year</InlineCode> or <InlineCode>new</InlineCode> to 
          test different data. Our algorithm takes the percentage increase that I mentioned above and 
          adds that percentage onto the mean. We found this to greatly increase our accuracy.
        </Typography>

        <Typography paragraph>
          We then print the data for each place so we can easily compare values, and 
          use it to alter our filtering values in <InlineCode>outlier_dict</InlineCode>.
        </Typography>

        <Image src={averageComparisonPNG} alt="Message with comparisons of our data vs gov." />
      

        <Graph file="gov_average_2010_old_multibar.html" />

        <Typography paragraph>
          <br/>Variable table for ProcessedData:
        </Typography>

        <Table headings={varTableHeadings} rows={varTableRows} />

      <Grid container justify="center" style={{marginTop: 30}}>
        <Button 
          href="/docs/visual" 
          variant="contained" 
          color="primary" 
          style={{padding: 10}}
          endIcon={<ArrowForwardIcon />}>
          Visualising Documentation
        </Button>
      </Grid>
    </PageSkeleton>
  );
}

export default React.memo(ProcessedDocs);