const Field = ({ legend, itype, type, value, onChange, name }) => {
  return (
    <>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          {legend}
        </label>
        <input
          type={itype ?? ""}
          class="form-control"
          value={value}
          onChange={(e) => onChange(e, type, name)}
        />
      </div>
    </>
  )
}

export default Field
