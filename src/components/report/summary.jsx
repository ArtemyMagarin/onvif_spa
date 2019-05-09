import React from 'react';

const Summary = (props) => {

    const result = props.testResponse.reduce((summary, item) => {
        summary[item.service] = summary[item.service] || [];
        summary[item.service].push(item);
        return summary;
      }, {});

    console.log(result);

    const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1)

    const summaryItems = Object.keys(result).sort().map((key, id) => (
        <React.Fragment key={id}>
            <p><b>{capitalize(key)}:</b></p>
            <table class="table table-bordered table-responsive-md">
                <tbody>
                    {result[key].map((item, id) => (
                        <tr className="row m-0">
                          <th className="col-1"scope="row">{id+1}</th>
                          <td className="col-5">{ item.name }</td>
                          {item.data.result ?
                          <td className={`col-6 ${item.data.result.supported ? "text-success":"text-danger"}`}>
                          {item.data.result.supported ? "Supported" : "Not supported"}
                          {item.data.result.report ?
                            <React.Fragment>
                              <button className="ml-3 btn btn-secondary btn-sm" data-toggle="collapse" data-target={`#features${id}`}>View</button>
                              <div id={`features${id}`} className="collapse">
                                {item.data.result.report.split("\n").map((i,key) => {
                                  return <p style={{'line-height': '20px'}}
                                  className="text-dark mt-2" key={key}>{i}</p>;
                                })}
                              </div>
                            </React.Fragment>
                          : (null)
                          }
                          </td>: (null)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </React.Fragment>)
    );

    console.log(summaryItems);

	return (
        <React.Fragment>
            { summaryItems }
        </React.Fragment>
    )
}

export default Summary;