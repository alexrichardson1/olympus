from setuptools import setup, find_packages

# sudo python3 setup.py develop

setup(
    name="olympus-plugins",
    description="These are the detectors and printers used for Olympus smart contracts.",
    url="",
    author="Alex Richardson",
    version="1.0",
    packages=find_packages(),
    python_requires=">=3.8",
    install_requires=["slither-analyzer==0.8.2"],
    entry_points={
        "slither_analyzer.plugin": "slither my-plugin=slither_plugin:make_plugin",
    },
)
