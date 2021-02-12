import React from 'react';
import Link from '../Link/Link';
import CaptionedHeading from '../CaptionedHeading/CaptionedHeading';
import PageSkeleton from '../PageSkeleton/PageSkeleton';
import CodeBlock from '../CodeBlock/CodeBlock';
import InlineCode from '../InlineCode/InlineCode';
import Graph from '../Graph/Graph';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { Typography, Button, Grid } from '@material-ui/core';

function ProcessedDocs(props) {

  return (
    <PageSkeleton active="docs/visual">
      <CaptionedHeading caption="Interactive graphs with ease - Robert">
        Data Visualisation
      </CaptionedHeading>

      <Typography variant="h4">
        Plotly
      </Typography>

      <Typography paragraph>
        Our visualisation tool of choice is plotly, a robust graphing library 
        with options for cross platform charts and interactivity. One of the 
        things that struck us about plotly was how the user can manipulate the graph, 
        and highlight different pieces of information.
      </Typography>

      <Typography paragraph>
        When we started the project, as Sam said in <Link to="/docs/clean">Cleaning</Link>, we  
        used dictionaries to store our data. Once we looked deeper into the plotly workflow 
        we discovered that the process is made much more streamline when you pass DataFrames, due to 
        their speed and memory efficiency.
      </Typography>

      <Typography variant="h4">
        Challenges
      </Typography>

      <Typography paragraph>
        Attempting to use plotly came with its fair share of challenges. For instance, plotly opens 
        every graph you make in a browser, but this was incredibly slow, especially if the users computer 
        isn't very fast. To combat this, we instead wrote the graph markup to a HTML file, and then 
        embedded that file on the website. This also allowed us to have more than one graph per page, 
        something that isn't possible without getting the HTML. 
      </Typography>

      <Typography variant="h4">
        The Code
      </Typography>
      <Typography paragraph>
        We made different algorithms to calculate different pieces of information and different 
        ways of graphing it, but first created a basic class to inherit CleanedData and ProcessedData 
        in a daisy chain fashion.
      </Typography>

      <CodeBlock
        gitLink="https://github.com/sammce/housing/blob/main/visual.py#L2-L7"
        line="2" >
{
`from process import ProcessedData

class VisualisedData(ProcessedData):

    def __init__(self):
        super().__init__()`
}
      </CodeBlock>

      <Typography paragraph>
        All of the algorithms we made were located in <InlineCode>main.py</InlineCode> as 
        it was easier than trying to make a method for each type of graph would be time consuming, 
        and could be classified as over-engineering.
      </Typography>

      <CodeBlock
        gitLink="https://github.com/sammce/housing/blob/main/main.py#L5-L21"
        line="5" >
{
`# Getting 3d scatter of county, price and year (OUR DATA)
# from 2010 - 2019
df = visualised.cleaned_data
data = []
for year in visualised.years_from_2010:
    for place in visualised.places_no_national:

        our_averages_df = df[
            (df['Year'] == year) & (df['County'] == place) & (df['Description']== 'New')
        ]
        
        data.append([place, round(our_averages_df['Price'].mean()), year])

our_average = visualised.pd.DataFrame(data, columns=['Place', 'Average Price (€)', 'Year'])
graph = px.scatter_3d(our_average, x="Place", y="Average Price (€)", z="Year", color="Place", title="Our computed averages for each county and year")
# graph.write_html("3d_scatter_per_year_scatter_3d.html", full_html=False, include_plotlyjs="https://cdn.plot.ly/plotly-latest.min.js")
# graph.show()`
}
      </CodeBlock>

      <Typography paragraph>
        Most of our graphs follow a similar pattern, which involves looping through the data we need 
        and creating a new DataFrame using specific selectors. This graph calculates the average price for each place 
        in each year and plots it on a 3D Scatter chart. To check the graph, we run 
        the <InlineCode>show</InlineCode> method, and <InlineCode>write_html</InlineCode> when 
        we want to make a new HTML file. The file names are dynamic which saved us a lot of time.
      </Typography>

      <Graph file="3d_scatter_per_year_scatter_3d.htm"/>

      <Typography paragraph>
        This short snippet of code shows the power of plotly, as in just 15 lines you can 
        create a customized 3D interactive graph.
      </Typography>

      <CodeBlock
        gitLink="https://github.com/sammce/housing/blob/main/main.py#L57-L81"
        line="57" >
{
`# bar chart of percentage increases in a specified year (GOV DATA)
# from 1976 - 2016
year = 2002
new = True # Change True to False to get second hand values
data = []

if new:
    df = visualised.new_change
    desc = "New"
    suffix = ""
else:
    df = visualised.old_change
    desc = "Second"
    suffix = " Hand"

for place in visualised.places:

    change_dict = df.loc[year, place] # this returns a dictionary
    percentage, numerical = change_dict['percent'], change_dict['numerical']
    data.append([place, numerical])

our_average = visualised.pd.DataFrame(data, columns=['Place', 'Change (€)'])
graph = px.bar(our_average, x="Place", y="Change (€)", color="Place", title=f"Numerical change from {year-1} - {year} ({desc} {suffix})")
# graph.write_html(f"percentage_{year}_bar.html", full_html=False, include_plotlyjs="https://cdn.plot.ly/plotly-latest.min.js")
# graph.show()`
}
      </CodeBlock>

      <Graph file="change_2002_bar.html"/>
      

      <Typography paragraph>
        Below is the same graph but with the percentage values instead of the numerical ones. Being able to 
        change small parts of the code to get different graphs was very beneficial to us, as it allowed us to 
        work at a good pace.
      </Typography>


      <Graph file="percent_change_2002_bar.html"/>
        
      

      <Grid container justify="center" style={{marginTop: 30}}>
        <Button 
          href="/findings" 
          variant="contained" 
          color="primary" 
          style={{padding: 10}}
          endIcon={<ArrowForwardIcon />}>
          Our Findings
        </Button>
      </Grid>
    </PageSkeleton>
  );
}

export default React.memo(ProcessedDocs);