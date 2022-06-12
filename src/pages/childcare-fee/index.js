
import React from 'react'
import { FloatingLabel, Form, Table } from 'react-bootstrap'
import BtnBasic from "@components/common/BtnBasic"
import { useState, useEffect, useContext, } from 'react'
import { feeMaster } from '../../lib/childcare'
import FeeCulcurator from '../../components/childcare-fee/FeeCulcurator'
import UsageAdjustment from '../../components/childcare-fee/UsageAdjustment'


export default function Index() {


	return <div>
		<UsageAdjustment />
		{/* <FeeCulcurator /> */}


	</div>
}
