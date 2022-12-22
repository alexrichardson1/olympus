#!/bin/bash
#SBATCH --gres=gpu:2
#SBATCH --mail-type=ALL
#SBATCH --mail-user=arr19

python3 -m virtualenv /vol/bitbucket/arr19/myvenv
export PATH=/vol/bitbucket/arr19/myvenv/bin/:$PATH

source activate

pip --version
pip install -r /vol/bitbucket/arr19/requirements.txt

source /vol/cuda/11.0.3-cudnn8.0.5.39/setup.sh
python -u /vol/bitbucket/arr19/Olympus/ml/lstm.py > log.txt