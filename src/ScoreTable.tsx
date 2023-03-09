import { useState, useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { VariableSizeGrid as Grid, VariableSizeGridProps } from 'react-window';
import CircleProgressBar from './CircleProgressBar'

export default function ScoreTable() {
    const [scores, setScores] = useState<ScoreData>({})
    const [day, setDay] = useState(0)
    const ref = useRef(null);

    const getDaysFromUserScores = () => {
        const days = Object.values(scores)[0]
        return days ? Object.keys(days) : []
    }

    const convertTimestampToDay = (timestamp: string) => {
        const date = new Date(parseInt(timestamp))
        return date.toUTCString()
    }

    const generateRandomData = () => {
        const randomData: ScoreData = {}
        const exampleNames = ['Jack', 'Jill', 'John', 'Jane', 'Joe', 'Jen', 'Patric', 'Mark']
        // generate 1000000 random names using the example names
        const uniqueNames = [];
        for (let i = 0; i < 200; i++) {
            uniqueNames.push(`${exampleNames[Math.floor(Math.random() * exampleNames.length)]}${i}`)
        }
        // generate object with random scores
        uniqueNames.forEach(name => {
            randomData[name] = {
                "1677658893169": {
                    "ac": true,
                    "cs": Math.floor(Math.random() * 100),
                    "es": Math.floor(Math.random() * 100),
                    "ps": Math.floor(Math.random() * 100),
                    "sc": Math.floor(Math.random() * 100)
                },
                "1677749826815": {
                    "ac": true,
                    "cs": Math.floor(Math.random() * 100),
                    "es": Math.floor(Math.random() * 100),
                    "ps": Math.floor(Math.random() * 100),
                    "sc": Math.floor(Math.random() * 100)
                },
                "1677840221239": {
                    "ac": true,
                    "cs": Math.floor(Math.random() * 100),
                    "es": Math.floor(Math.random() * 100),
                    "ps": Math.floor(Math.random() * 100),
                    "sc": Math.floor(Math.random() * 100)
                }
            }
        })
        return randomData;

    }

    useEffect(() => {
        // generate random data
        const randomData = generateRandomData()
        setScores(randomData)
    }, [])

    return (
        <>
            <Select onChange={(e) => setDay(parseInt(e.target.value))}>
                {getDaysFromUserScores()?.map((day, index) => (
                    <option key={index} value={index}>
                        {convertTimestampToDay(day)}
                    </option>
                ))}
            </Select>
                        <GridWrapper
                        columnCount={2}
                        columnWidth={index => (index === 0 ? 150 : 200)}
                        height={400}
                        rowCount={Object.keys(scores).length}
                        rowHeight={index => 30}
                        width={300}
                        className="Grid"
                    >
                        {({ columnIndex, rowIndex, style }) => { 
                            const name = Object.keys(scores)[rowIndex]
                            const day = Object.keys(scores[name])[columnIndex]
                            const score = scores[name][day]
                            return (
                                <div style={style}>
                                    {columnIndex === 0 ? (
                                        <div className="GridItemOdd">{name}</div>
                                    ) : (
                                        // <div className="GridItemEven">
                                        //     <CircleProgressBar

                                        //         score={score.sc}
                                        //         color="var(--row-text)"
                                        //         size={20}
                                        //         strokeWidth={3}
                                        //     />
                                        // </div>
                                        <div>{score.sc}</div>
                                    )}
                                </div>
                            )
                        }}
                    </GridWrapper>
        </>
    )
}

const GridWrapper = styled(Grid)`

.Grid {
  border: 1px solid #d9dddd;
}

.GridItemEven,
.GridItemOdd {
  display: flex;
  align-items: center;
  justify-content: center;
}

.GridItemEven {
  background-color: #f8f8f0;
}
`



const Table = styled.table`
    width: 300px;
    border-collapse: collapse;
    color: var(--row-text);
    text-transform: uppercase;
    font-weight: 600;
    thead {
        color: var(--secondary);
        width: 300px;
    }
    tr:nth-child(even) {
        background-color: var(--background-even);
        .outer-circle {
            stroke: var(--outer-circle-even);
            fill: var(--outer-circle-even);
        }
    }
    tr:nth-child(odd) {
        background-color: var(--background);
        .outer-circle {
            stroke: var(--outer-circle);
            fill: var(--outer-circle);
        }
    }
    th {
        background-color: var(--header-background);
        text-align: center;
        font-family: 'Arial Nova Light', sans-serif;

    }
    th, td {
        border: 1px solid var(--secondary);
        padding: 8px;
    }
    td {
        padding-left: 17px;
    }
    .progress-circle-cell {
        padding-left: 20px;
        padding-top: 5px;
        padding-bottom: 5px;
  }
  /* .rows {
    content-visibility: auto;
  } */
`

// display sticky select on the top


const Select = styled.select`
    width: 300px;
    height: 30px;
    margin-bottom: 20px;
    border: 1px solid var(--secondary);
    border-radius: 5px;
    background-color: var(--background);
    color: var(--row-text);
    text-transform: uppercase;
    font-weight: 600;
    font-family: 'Arial Nova Light', sans-serif;
    position: sticky;
    top: 0;
    z-index: 1;
`

interface Score {
    ac?: boolean
    cs?: number
    es?: number
    ps?: number
    sc: number
}

interface ScoreData {
    [name: string]: {
        [timestamp: string]: Score
    }
}

const getLevel = (score: number) => {
    if (score >= 84) {
        return 'Peak';
    } else if (score >= 70) {
        return 'Strong';
    } else if (score >= 60) {
        return 'Primed';
    } else if (score >= 40) {
        return 'Baseline';
    } else if (score >= 30) {
        return 'Compromised';
    } else if (score >= 17) {
        return 'Fatigued';
    } else {
        return 'Drained';
    }
};
export const getLevelColor = (score: number) => {
    return colorMap[getLevel(score)];
};
export const getLevelName = (score: number) => {
    return getLevel(score);
};
const colorMap = {
    'Peak': 'var(--peak)',
    'Strong': 'var(--strong)',
    'Primed': 'var(--primed)',
    'Baseline': 'var(--baseline)',
    'Compromised': 'var(--compromised)',
    'Fatigued': 'var(--fatigued)',
    'Drained': 'var(--drained)',
};
