export interface DiagnosticEntry {
    line: number;
    column: number;
    message: string;
}

export interface ValidationStats {
    isValid: boolean;
    errorCount: number;
    warningCount: number;
}

export interface ValidationDiagnostic {
    errors: DiagnosticEntry[];
    warnings: DiagnosticEntry[];
}

export interface ValidationState {
    diagnostics: ValidationDiagnostic;
    stats: ValidationStats;
}
