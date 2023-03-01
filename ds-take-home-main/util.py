import os
from typing import Optional

import pandas as pd
import zipfile


def load_zipped_csv_dir(path: str, *, prefix: Optional[str] = None, include_file_column:bool = False, **kwargs) -> pd.DataFrame:
    """Load a zipped directory containing multiple CSVs into a DataFrame.
    
    
    Args:
        path: the path to the zip file archive
        prefix: a filename prefix for files in the zip archive
        include_file_column: whether to include an additional column with the name of the file
            data was loaded from
        kwargs: additional keyword args to pass to pandas read_csv
    
    Returns:
        a DataFrame containing the loaded data from all CSVs in the zip file
        An additional
    """
    z = zipfile.ZipFile(path)
    files = [f for f in z.infolist() if not prefix or os.path.basename(f.filename).startswith(prefix)]
    dfs = []
    for f in files:
        df = pd.read_csv(z.open(f), sep='\t', **kwargs)
        if include_file_column:
            df['file'] = f.filename
        dfs.append(df)
    return pd.concat(dfs)
    # return pd.concat([pd.read_csv(z.open(f), sep='\t', header=None, names=['date', 'time', 'code', 'value']) for f in files])