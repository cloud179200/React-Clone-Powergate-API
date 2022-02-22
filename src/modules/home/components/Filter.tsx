import { DatePicker } from "@mui/lab";
import { Button, FormControl, Stack, TextField, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { IFilter, IFilterValidation } from "../../../models/data"
import { validateFilter, validFilter } from "../utils";
import { FormattedMessage } from "react-intl"
import { LIST_STATUS_INVOICE_HISTORY } from "../../../utils/constants";

interface Props {
    onApply: (filter: IFilter) => void;
    onClear: () => void;
}

const Filter = (props: Props) => {
    const { onApply, onClear } = props;
    const [validate, setValidate] = useState<IFilterValidation>()
    const [filter, setFilter] = useState<IFilter>({ status: "", from: new Date(), to: new Date(new Date().setDate(new Date().getDate() + 1)), order: "" })
    const statuses = LIST_STATUS_INVOICE_HISTORY
    const handleApply = (e: any) => {
        const validate = validateFilter(filter);
        setValidate(validate);

        if (!validFilter(validate)) {
            return;
        }
        onApply(filter)
    }
    const handleClear = (e: any) => {
        setFilter({ status: "", from: new Date(), to: new Date(new Date().setDate(new Date().getDate() + 1)), order: "" })
        onClear()
    }
    useEffect(() => {
        if (!filter.order) {
            return
        }
        const validate = validateFilter(filter);
        setValidate(validate);

        if (!validFilter(validate)) {
            return;
        }
        onApply(filter)
    }, [filter  , onApply])
    return <>
        <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={2}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel><FormattedMessage id="status" /></InputLabel>
                <Select
                    label={!!validate?.status ? <FormattedMessage id={validate.status} /> : <FormattedMessage id="status" />}
                    value={filter.status}
                    onChange={(e) =>
                        setFilter({ ...filter, status: e.target.value })
                    }
                >{statuses.map((stt) =>
                    <MenuItem value={stt} key={stt}>{stt}</MenuItem>
                )}
                </Select>
            </FormControl>
            <DatePicker
                label={!!validate?.from ? <FormattedMessage id={validate.from} /> : <FormattedMessage id="from" />}
                value={filter.from}
                onChange={(newValue) => {
                    newValue && setFilter({ ...filter, from: newValue })
                }}
                renderInput={(params) => (
                    <TextField {...params} error={!!validate?.from} size="small" />
                )}
                inputFormat="dd/MM/yyyy"
            />
            <DatePicker
                label={!!validate?.to ? <FormattedMessage id={validate.to} /> : <FormattedMessage id="to" />}
                value={filter.to}
                onChange={(newValue: any) => {
                    newValue && setFilter({ ...filter, to: newValue })
                }}
                renderInput={(params) => (
                    <TextField {...params} error={!!validate?.to} size="small" />
                )}
                inputFormat="dd/MM/yyyy"
            />
            <TextField sx={{ minWidth: 150 }} label={<><FormattedMessage id="order" />&nbsp;#</>} size='small' value={filter.order} onChange={(e: any) => {
                setFilter({ ...filter, order: e.target.value })
            }} variant="outlined" />
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
            <Button variant="outlined" onClick={handleApply}>Apply</Button>
            <Button variant="outlined" onClick={handleClear} color='error'>Clear</Button>
        </Stack>
    </>
}
export default Filter