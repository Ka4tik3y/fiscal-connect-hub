
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, TrendingUp, Percent, IndianRupee, PiggyBank, Building, Zap } from 'lucide-react';

export const CalculatorHub = () => {
  const [activeCalculator, setActiveCalculator] = useState('gst');

  const calculators = [
    { id: 'gst', name: 'GST Calculator', icon: Percent, gradient: 'from-green-500 to-emerald-500' },
    { id: 'emi', name: 'EMI Calculator', icon: IndianRupee, gradient: 'from-blue-500 to-cyan-500' },
    { id: 'sip', name: 'SIP Calculator', icon: TrendingUp, gradient: 'from-purple-500 to-pink-500' },
    { id: 'tax', name: 'Income Tax Calculator', icon: Building, gradient: 'from-red-500 to-orange-500' },
    { id: 'fd', name: 'FD Calculator', icon: PiggyBank, gradient: 'from-indigo-500 to-purple-500' },
    { id: 'compound', name: 'Compound Interest', icon: Calculator, gradient: 'from-teal-500 to-blue-500' }
  ];

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'gst': return <GSTCalculator />;
      case 'emi': return <EMICalculator />;
      case 'sip': return <SIPCalculator />;
      case 'tax': return <TaxCalculator />;
      case 'fd': return <FDCalculator />;
      case 'compound': return <CompoundInterestCalculator />;
      default: return <GSTCalculator />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          Financial Calculators Suite
        </h2>
        <p className="text-gray-300 text-lg">Advanced calculation tools for professional financial analysis</p>
      </div>

      {/* Calculator Selector */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {calculators.map((calc) => {
          const Icon = calc.icon;
          return (
            <button
              key={calc.id}
              onClick={() => setActiveCalculator(calc.id)}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-300 ${
                activeCalculator === calc.id
                  ? 'transform scale-105 shadow-2xl'
                  : 'hover:scale-102 hover:shadow-lg'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${calc.gradient} ${
                activeCalculator === calc.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-80'
              } transition-opacity duration-300`}></div>
              <div className={`relative p-4 text-center ${
                activeCalculator === calc.id ? 'text-white' : 'text-gray-300 group-hover:text-white'
              } transition-colors duration-300`}>
                <Icon className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm font-semibold">{calc.name}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Calculator Content */}
      <div className="bg-black/20 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
        {renderCalculator()}
      </div>
    </div>
  );
};

const GSTCalculator = () => {
  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState('18');
  const [calculationType, setCalculationType] = useState('exclusive');
  const [result, setResult] = useState<any>(null);

  const calculateGST = () => {
    const baseAmount = parseFloat(amount);
    const rate = parseFloat(gstRate);
    
    if (isNaN(baseAmount) || isNaN(rate)) return;

    let gstAmount, totalAmount, netAmount;
    
    if (calculationType === 'exclusive') {
      gstAmount = (baseAmount * rate) / 100;
      totalAmount = baseAmount + gstAmount;
      netAmount = baseAmount;
    } else {
      totalAmount = baseAmount;
      netAmount = baseAmount / (1 + rate / 100);
      gstAmount = totalAmount - netAmount;
    }

    setResult({
      netAmount: netAmount.toFixed(2),
      gstAmount: gstAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      cgst: (gstAmount / 2).toFixed(2),
      sgst: (gstAmount / 2).toFixed(2)
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl">
          <Percent className="h-8 w-8 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">GST Calculator</h3>
          <p className="text-gray-300">Calculate GST inclusive/exclusive amounts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <Label className="text-white mb-2 block">Amount (₹)</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="bg-black/30 border-white/20 text-white"
            />
          </div>

          <div>
            <Label className="text-white mb-2 block">GST Rate (%)</Label>
            <Select value={gstRate} onValueChange={setGstRate}>
              <SelectTrigger className="bg-black/30 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5%</SelectItem>
                <SelectItem value="12">12%</SelectItem>
                <SelectItem value="18">18%</SelectItem>
                <SelectItem value="28">28%</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-white mb-2 block">Calculation Type</Label>
            <Select value={calculationType} onValueChange={setCalculationType}>
              <SelectTrigger className="bg-black/30 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exclusive">GST Exclusive</SelectItem>
                <SelectItem value="inclusive">GST Inclusive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={calculateGST} className="w-full bg-gradient-to-r from-green-500 to-emerald-500">
            <Calculator className="h-4 w-4 mr-2" />
            Calculate GST
          </Button>
        </div>

        {result && (
          <Card className="bg-black/30 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">GST Calculation Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-4 rounded-lg">
                  <p className="text-gray-300 text-sm">Net Amount</p>
                  <p className="text-white text-xl font-bold">₹{result.netAmount}</p>
                </div>
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg">
                  <p className="text-gray-300 text-sm">GST Amount</p>
                  <p className="text-white text-xl font-bold">₹{result.gstAmount}</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-lg">
                  <p className="text-gray-300 text-sm">CGST ({gstRate/2}%)</p>
                  <p className="text-white text-xl font-bold">₹{result.cgst}</p>
                </div>
                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 p-4 rounded-lg">
                  <p className="text-gray-300 text-sm">SGST ({gstRate/2}%)</p>
                  <p className="text-white text-xl font-bold">₹{result.sgst}</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-4 rounded-lg">
                <p className="text-gray-300 text-sm">Total Amount</p>
                <p className="text-white text-2xl font-bold">₹{result.totalAmount}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

const EMICalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculateEMI = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(tenure) * 12;

    if (isNaN(P) || isNaN(r) || isNaN(n)) return;

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - P;

    setResult({
      emi: emi.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      principal: P.toFixed(2)
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl">
          <IndianRupee className="h-8 w-8 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">EMI Calculator</h3>
          <p className="text-gray-300">Calculate Equated Monthly Installments</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <Label className="text-white mb-2 block">Loan Amount (₹)</Label>
            <Input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="Enter loan amount"
              className="bg-black/30 border-white/20 text-white"
            />
          </div>

          <div>
            <Label className="text-white mb-2 block">Interest Rate (% per annum)</Label>
            <Input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="Enter interest rate"
              className="bg-black/30 border-white/20 text-white"
            />
          </div>

          <div>
            <Label className="text-white mb-2 block">Loan Tenure (Years)</Label>
            <Input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              placeholder="Enter tenure in years"
              className="bg-black/30 border-white/20 text-white"
            />
          </div>

          <Button onClick={calculateEMI} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500">
            <Calculator className="h-4 w-4 mr-2" />
            Calculate EMI
          </Button>
        </div>

        {result && (
          <Card className="bg-black/30 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">EMI Calculation Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-6 rounded-lg text-center">
                <p className="text-gray-300 text-sm">Monthly EMI</p>
                <p className="text-white text-3xl font-bold">₹{result.emi}</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg">
                  <p className="text-gray-300 text-sm">Principal Amount</p>
                  <p className="text-white text-xl font-bold">₹{result.principal}</p>
                </div>
                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 p-4 rounded-lg">
                  <p className="text-gray-300 text-sm">Total Interest</p>
                  <p className="text-white text-xl font-bold">₹{result.totalInterest}</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-lg">
                  <p className="text-gray-300 text-sm">Total Amount</p>
                  <p className="text-white text-xl font-bold">₹{result.totalAmount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [expectedReturn, setExpectedReturn] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculateSIP = () => {
    const P = parseFloat(monthlyInvestment);
    const r = parseFloat(expectedReturn) / 100 / 12;
    const n = parseFloat(timePeriod) * 12;

    if (isNaN(P) || isNaN(r) || isNaN(n)) return;

    const maturityAmount = P * (((Math.pow(1 + r, n)) - 1) / r) * (1 + r);
    const investedAmount = P * n;
    const estimatedReturns = maturityAmount - investedAmount;

    setResult({
      maturityAmount: maturityAmount.toFixed(2),
      investedAmount: investedAmount.toFixed(2),
      estimatedReturns: estimatedReturns.toFixed(2)
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
          <TrendingUp className="h-8 w-8 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">SIP Calculator</h3>
          <p className="text-gray-300">Calculate Systematic Investment Plan returns</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <Label className="text-white mb-2 block">Monthly Investment (₹)</Label>
            <Input
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(e.target.value)}
              placeholder="Enter monthly SIP amount"
              className="bg-black/30 border-white/20 text-white"
            />
          </div>

          <div>
            <Label className="text-white mb-2 block">Expected Annual Return (%)</Label>
            <Input
              type="number"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(e.target.value)}
              placeholder="Enter expected return rate"
              className="bg-black/30 border-white/20 text-white"
            />
          </div>

          <div>
            <Label className="text-white mb-2 block">Time Period (Years)</Label>
            <Input
              type="number"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              placeholder="Enter investment period"
              className="bg-black/30 border-white/20 text-white"
            />
          </div>

          <Button onClick={calculateSIP} className="w-full bg-gradient-to-r from-purple-500 to-pink-500">
            <TrendingUp className="h-4 w-4 mr-2" />
            Calculate SIP
          </Button>
        </div>

        {result && (
          <Card className="bg-black/30 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">SIP Calculation Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-lg text-center">
                <p className="text-gray-300 text-sm">Maturity Amount</p>
                <p className="text-white text-3xl font-bold">₹{result.maturityAmount}</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-4 rounded-lg">
                  <p className="text-gray-300 text-sm">Invested Amount</p>
                  <p className="text-white text-xl font-bold">₹{result.investedAmount}</p>
                </div>
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg">
                  <p className="text-gray-300 text-sm">Estimated Returns</p>
                  <p className="text-white text-xl font-bold">₹{result.estimatedReturns}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

const TaxCalculator = () => {
  const [income, setIncome] = useState('');
  const [regime, setRegime] = useState('new');
  const [result, setResult] = useState<any>(null);

  const calculateTax = () => {
    const annualIncome = parseFloat(income);
    if (isNaN(annualIncome)) return;

    let taxableIncome = annualIncome;
    let tax = 0;

    if (regime === 'new') {
      // New Tax Regime (FY 2023-24)
      taxableIncome = annualIncome - 50000; // Standard deduction
      
      if (taxableIncome <= 250000) tax = 0;
      else if (taxableIncome <= 500000) tax = (taxableIncome - 250000) * 0.05;
      else if (taxableIncome <= 750000) tax = 12500 + (taxableIncome - 500000) * 0.10;
      else if (taxableIncome <= 1000000) tax = 37500 + (taxableIncome - 750000) * 0.15;
      else if (taxableIncome <= 1250000) tax = 75000 + (taxableIncome - 1000000) * 0.20;
      else if (taxableIncome <= 1500000) tax = 125000 + (taxableIncome - 1250000) * 0.25;
      else tax = 187500 + (taxableIncome - 1500000) * 0.30;
    } else {
      // Old Tax Regime
      taxableIncome = annualIncome - 150000; // Standard deduction + basic exemption
      
      if (taxableIncome <= 0) tax = 0;
      else if (taxableIncome <= 250000) tax = 0;
      else if (taxableIncome <= 500000) tax = (taxableIncome - 250000) * 0.05;
      else if (taxableIncome <= 1000000) tax = 12500 + (taxableIncome - 500000) * 0.20;
      else tax = 112500 + (taxableIncome - 1000000) * 0.30;
    }

    const cess = tax * 0.04; // 4% Health and Education Cess
    const totalTax = tax + cess;
    const netIncome = annualIncome - totalTax;

    setResult({
      grossIncome: annualIncome.toFixed(2),
      taxableIncome: Math.max(0, taxableIncome).toFixed(2),
      incomeTax: tax.toFixed(2),
      cess: cess.toFixed(2),
      totalTax: totalTax.toFixed(2),
      netIncome: netIncome.toFixed(2)
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl">
          <Building className="h-8 w-8 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">Income Tax Calculator</h3>
          <p className="text-gray-300">Calculate income tax for FY 2023-24</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <Label className="text-white mb-2 block">Annual Income (₹)</Label>
            <Input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Enter annual income"
              className="bg-black/30 border-white/20 text-white"
            />
          </div>

          <div>
            <Label className="text-white mb-2 block">Tax Regime</Label>
            <Select value={regime} onValueChange={setRegime}>
              <SelectTrigger className="bg-black/30 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New Tax Regime</SelectItem>
                <SelectItem value="old">Old Tax Regime</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={calculateTax} className="w-full bg-gradient-to-r from-red-500 to-orange-500">
            <Calculator className="h-4 w-4 mr-2" />
            Calculate Tax
          </Button>
        </div>

        {result && (
          <Card className="bg-black/30 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Tax Calculation Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-4 rounded-lg">
                  <p className="text-gray-300 text-sm">Gross Income</p>
                  <p className="text-white text-xl font-bold">₹{result.grossIncome}</p>
                </div>
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg">
                  <p className="text-gray-300 text-sm">Taxable Income</p>
                  <p className="text-white text-xl font-bold">₹{result.taxableIncome}</p>
                </div>
                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 p-4 rounded-lg">
                  <p className="text-gray-300 text-sm">Income Tax</p>
                  <p className="text-white text-xl font-bold">₹{result.incomeTax}</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-lg">
                  <p className="text-gray-300 text-sm">Health & Education Cess</p>
                  <p className="text-white text-xl font-bold">₹{result.cess}</p>
                </div>
                <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 p-4 rounded-lg">
                  <p className="text-gray-300 text-sm">Total Tax</p>
                  <p className="text-white text-xl font-bold">₹{result.totalTax}</p>
                </div>
                <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-6 rounded-lg text-center">
                  <p className="text-gray-300 text-sm">Net Income (After Tax)</p>
                  <p className="text-white text-2xl font-bold">₹{result.netIncome}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

const FDCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [compoundFreq, setCompoundFreq] = useState('4');
  const [result, setResult] = useState<any>(null);

  const calculateFD = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(tenure);
    const n = parseFloat(compoundFreq);

    if (isNaN(P) || isNaN(r) || isNaN(t) || isNaN(n)) return;

    const maturityAmount = P * Math.pow(1 + r / n, n * t);
    const interestEarned = maturityAmount - P;

    setResult({
      principal: P.toFixed(2),
      maturityAmount: maturityAmount.toFixed(2),
      interestEarned: interestEarned.toFixed(2)
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl">
          <PiggyBank className="h-8 w-8 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">Fixed Deposit Calculator</h3>
          <p className="text-gray-300">Calculate FD maturity amount and interest</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <Label className="text-white mb-2 block">Principal Amount (₹)</Label>
            <Input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="Enter deposit amount"
              className="bg-black/30 border-white/20 text-white"
            />
          </div>

          <div>
            <Label className="text-white mb-2 block">Interest Rate (% per annum)</Label>
            <Input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="Enter interest rate"
              className="bg-black/30 border-white/20 text-white"
            />
          </div>

          <div>
            <Label className="text-white mb-2 block">Tenure (Years)</Label>
            <Input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              placeholder="Enter tenure in years"
              className="bg-black/30 border-white/20 text-white"
            />
          </div>

          <div>
            <Label className="text-white mb-2 block">Compounding Frequency</Label>
            <Select value={compoundFreq} onValueChange={setCompoundFreq}>
              <SelectTrigger className="bg-black/30 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Annually</SelectItem>
                <SelectItem value="2">Half-Yearly</SelectItem>
                <SelectItem value="4">Quarterly</SelectItem>
                <SelectItem value="12">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={calculateFD} className="w-full bg-gradient-to-r from-indigo-500 to-purple-500">
            <PiggyBank className="h-4 w-4 mr-2" />
            Calculate FD
          </Button>
        </div>

        {result && (
          <Card className="bg-black/30 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">FD Calculation Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 p-6 rounded-lg text-center">
                <p className="text-gray-300 text-sm">Maturity Amount</p>
                <p className="text-white text-3xl font-bold">₹{result.maturityAmount}</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-4 rounded-lg">
                  <p className="text-gray-300 text-sm">Principal Amount</p>
                  <p className="text-white text-xl font-bold">₹{result.principal}</p>
                </div>
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg">
                  <p className="text-gray-300 text-sm">Interest Earned</p>
                  <p className="text-white text-xl font-bold">₹{result.interestEarned}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [frequency, setFrequency] = useState('1');
  const [result, setResult] = useState<any>(null);

  const calculateCompoundInterest = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(frequency);

    if (isNaN(P) || isNaN(r) || isNaN(t) || isNaN(n)) return;

    const amount = P * Math.pow(1 + r / n, n * t);
    const compoundInterest = amount - P;

    setResult({
      principal: P.toFixed(2),
      amount: amount.toFixed(2),
      compoundInterest: compoundInterest.toFixed(2)
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl">
          <Calculator className="h-8 w-8 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">Compound Interest Calculator</h3>
          <p className="text-gray-300">Calculate compound interest and final amount</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <Label className="text-white mb-2 block">Principal Amount (₹)</Label>
            <Input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="Enter principal amount"
              className="bg-black/30 border-white/20 text-white"
            />
          </div>

          <div>
            <Label className="text-white mb-2 block">Interest Rate (% per annum)</Label>
            <Input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="Enter interest rate"
              className="bg-black/30 border-white/20 text-white"
            />
          </div>

          <div>
            <Label className="text-white mb-2 block">Time Period (Years)</Label>
            <Input
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Enter time in years"
              className="bg-black/30 border-white/20 text-white"
            />
          </div>

          <div>
            <Label className="text-white mb-2 block">Compounding Frequency</Label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger className="bg-black/30 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Annually</SelectItem>
                <SelectItem value="2">Semi-Annually</SelectItem>
                <SelectItem value="4">Quarterly</SelectItem>
                <SelectItem value="12">Monthly</SelectItem>
                <SelectItem value="365">Daily</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={calculateCompoundInterest} className="w-full bg-gradient-to-r from-teal-500 to-blue-500">
            <Calculator className="h-4 w-4 mr-2" />
            Calculate
          </Button>
        </div>

        {result && (
          <Card className="bg-black/30 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Compound Interest Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-teal-500/20 to-blue-500/20 p-6 rounded-lg text-center">
                <p className="text-gray-300 text-sm">Final Amount</p>
                <p className="text-white text-3xl font-bold">₹{result.amount}</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-4 rounded-lg">
                  <p className="text-gray-300 text-sm">Principal Amount</p>
                  <p className="text-white text-xl font-bold">₹{result.principal}</p>
                </div>
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg">
                  <p className="text-gray-300 text-sm">Compound Interest</p>
                  <p className="text-white text-xl font-bold">₹{result.compoundInterest}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
