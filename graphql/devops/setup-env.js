#!/usr/bin/env node

import {setupDB} from './lib/pg'
import setupS3 from './lib/s3'

setupDB().then(setupS3)
