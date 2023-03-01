# HealthRhythms Data Science Take Home

Welcome! At HealthRhythms, we apply data science to important problems in
mental healthcare. Healthcare offers a lot of opportunity for impact with
data science, but it is important to apply data science techniques with caution
and attention to detail -- because the predictions can be high-stakes.

As such, this take home was designed to give you an opportunity to show us how
you would approach a problem in healthcare. There is a lot of directions you
can take with this problem and it's easy to spend a lot of time on this.

We recommend that you spend no more than 3 hours on this. Please read this
entire README before beginning, and see the rubric at the
end for an overview of the criteria we'll be looking at.

There are many decisions you will need to make throughout this project; most
decisions are fine, as long as you can justify your choices. When you make an
explicit decision, please add comments/documentation/etc to help us understand
your rationale.

If anything in this take home is unclear, please reach out and ask questions.
We are happy to clarify anything and improve this repo for future candidates!

We are looking forward to seeing how you approach this problem!

## The Data
The dataset we will use is the [MHealth Dataset](https://archive.ics.uci.edu/ml/datasets/MHEALTH+Dataset) from the UCI ML Repository.
This dataset contains data about activities performed across 10 subjects. We recommend you read through the linked UCI ML Repository
dataset page as it explains pertinent information about the dataset that will be useful for your modeling and analysis.

We have helped by providing a `TakeHome.ipynb` file which loads the dataset and puts it into a helpful format (e.g. with column names).

## The Model
We want to predict whether a person is moving or stationary. Note that this will require you making some decisions about which labels
correspond to movement vs stationary.

You should

## Questions to Answer
In addition to building a model, there are some questions we would like you to
answer based on your experience building the model and possibly additional
analysis with the model.

1. How should we label moving vs not moving? Why?
2. What modeling approach did you use? Why?
3. Describe your most predictive features; why do you think they are predictive?
4. Describe how you evaluated your model. How did you split your dataset? What metrics did you evaluate on? Why?
5. Think about deploying this model for use in a healthcare setting (e.g. remote patient monitoring). What concerns or considerations would you have for this model?

## Setup
To get started, we recommend you use [conda](https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html)
to manage your development environment. This will make it easy for us to run
your work ourselves.

Once you have `conda` installed, run the following to setup and activate the
environment:

```
conda env create --file conda_env.yml
conda activate hrth
```

Then you can start a Jupyter server for building notebooks:

```
jupyter-lab \                                                                                                                                                                                                         
    --ip=0.0.0.0 \
    --port=9797 \
    --allow-root \
    --NotebookApp.token='' \
    --NotebookApp.password=''
```

Feel free to update the `conda_env.yml` file; e.g. to include other
dependencies you would like to use. Do not feel the need to use any specific
tools or libraries; what we setup preinstalled was just a guess at what most
common needs would be. Use the tools you are most comfortable with.

If you update the `conda_env.yml` you can run the following to update the
environment with your changes:

```
conda env update --file conda_env.yml --prune
```

## Form Factor
Again, use whatever tools you are comfortable with. However, we expect you to
deliver either a Jupyter notebook (preferred) or a runnable python script.

Either way, please provide instructions on how we can run / reproduce your
results.

## Rubric
When reviewing your work, we will assess the following characteristics:

- Are we able to successfully run the project with minimal modification?
- Are all steps of building the model clear (e.g. data processing, model training, model evaluation)?
- Is the model evaluation a convincing method of proving model efficacy (e.g. are reasonable metrics chosen? is the data split correctly? no feature leakage?)
- Is there stated and clear rationale for data and modeling choices?
