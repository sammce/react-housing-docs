import React from 'react';
import CaptionedHeading from '../CaptionedHeading/CaptionedHeading';
import PageSkeleton from '../PageSkeleton/PageSkeleton';
import InlineCode from '../InlineCode/InlineCode';
import Graph from '../Graph/Graph';

import { Typography, Grid } from '@material-ui/core';

function ProcessedDocs() {

  return (
    <PageSkeleton active="findings">
      <CaptionedHeading caption="An ever changing market - Sam">
        Findings
      </CaptionedHeading>

      <Typography variant="h4">
        Hypotheses
      </Typography>

      <Typography paragraph>
        Our hypothesis was that the price of houses would tend to increase, with the exception 
        of 2008 during the crash of the housing market, and in 2020 due to Covid-19.
      </Typography>

      <Typography variant="h4">
        Before the milennium
      </Typography>

      <Typography paragraph>
        While scanning over the data, we were amazed at how low the prices of houses used to be. In 1976, 
        the average price of housing was only around €15,000.
      </Typography>

      <Graph file="new_and_old_average_1976_multibar.html" />

      <Typography paragraph>
        The average annual increase across Ireland from 1976 - 2000 was 
        10.6%, or using the formula <InlineCode>F = P(1 + i)^t</InlineCode> to calculate 
        compound interest, an average of €162,520 increase in 24 years. This means the prices multiplied 
        by 10 in that space of time. This supports our hypothesis as it showcases the steep increase 
        in the value of the housing market in Ireland.
      </Typography>

      <Graph file="new_and_old_average_2000_multibar.html" />

      <Typography variant="h4">
        The 2008 Crash
      </Typography>

      <Typography paragraph>
        As I'm sure most people are aware, the global housing market suffered a 
        devastating crach in 2008/2009, and you can be certain this was shown in the data. 
        In the following scatter graph, you can clearly see a dip starting in 2006 across all 
        counties, which reflects the crisis.
      </Typography>

      <Graph file="nationwide_averages_line_old_multiline.html" />

      <Typography paragraph>
        If we look at the percentage change from 2007 - 2008, we can clearly see 
        it is a steep decrease, Dublin bearing the brunt of it, with a 10.37% decrease in 2008.
        The following year was even worse, with Cork seeing as much as a 28% decrease. The average 
        decrease in 2009 was 21.45%.
      </Typography>

      <Graph file="percent_change_2008_bar.html" />

      <Graph file="percent_change_2009_bar.html" />

      <Typography paragraph>
        We can see from the scatter graph that the prices haven't returned to where they were in the height of the boom, 
        but may have been on track to do so shortly if not for Covid.
      </Typography>

      <Typography variant="h4">
        The 2010's
      </Typography>

      <Typography paragraph>
        Although the price of housing wouldn't go back to its peak during the Celtic Tiger, 
        the price certainly increased in the 2010's, as shown by the graph below. The greatest 
        increase can be seen in Dublin and Galway, which both increased ~€85,000 each, 
        a 31% increase.
      </Typography>

      <Graph file="compare_average_2010_2019_multibar.html" />

      <Typography paragraph>
        The one exception is Waterford, where the average price actually decreased ever so slightly over the 9 years.
      </Typography>

      <Typography variant="h4">
        Predictions
      </Typography>

      <Typography paragraph>
        Unfortunately we have no data after 2019, so we can't study the effects of Covid-19 on the market,
        but we have come to the conclusion based on the data we do have that we can expect that the prices went 
        down something similar to that of the 2008/2009 crash, 21.45%. This would put the average price of Dublin houses 
        just above the €300,000 mark.
      </Typography>

      <Typography paragraph>
        We can also expect a gradual decrease in the years following also, until 2022, when we believe the market will start to pick up again.
        After careful consideration, we have concluded that an increase of 8% - 12% will take place 
        annually in 2023 and beyond, under the assumption that no major recession occurs again.
        This would put the price of houses in 2024 at around €350,000.
      </Typography>

      <Graph file="predict_average_2024_bar.html" />
      <Graph file="predict_pricepoints_2024_bar.html" />

      <Typography variant="h4">
        Conclusion
      </Typography>

      <Typography paragraph>
        It is evident from the data that the average price of housing in Ireland tends to increase, 
        but is not immune to change under tough circumstances such as a recession.
      </Typography>


        
      

      <Grid container justify="center" style={{marginTop: 30}}>
        {/* <Button 
          href="/findings" 
          variant="contained" 
          color="primary" 
          style={{padding: 10}}
          endIcon={<ArrowForwardIcon />}>
          Our Findings
        </Button> */}
      </Grid>
    </PageSkeleton>
  );
}

export default React.memo(ProcessedDocs);