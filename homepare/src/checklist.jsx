// the checklist is generated from our user's questionnaire results

export function Checklist () {
    console.log('this is checklist')
    return(
        <>
        <h1>Checklist</h1>
        <h2>You are looking for a:</h2>
        <h3>__ Bedroom</h3>
        <h3>__ Bathroom home</h3>
        <h3>with/without a yard</h3>
        <h3>with/without a garage</h3>
        <h3>with/without a HOA</h3>
        {/* yard, garage, and HOA can disappear if user selects 'not sure' */}
        </>
    )
}